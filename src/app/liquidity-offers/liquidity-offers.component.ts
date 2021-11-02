import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Node } from '../shared/models/store';
import { LiquidityService } from '../shared/services/liquidity.service';
import { OpenChannelModalComponent } from '../open-channel-modal/open-channel-modal.component';
import { SortableHeader, SortEvent } from '../shared/directive/sortable.directive';

@Component({
  selector: 'lads-liquidity-offers',
  templateUrl: './liquidity-offers.component.html',
  styleUrls: ['./liquidity-offers.component.scss']
})
export class LiquidityOffersComponent implements OnInit, OnDestroy {
  @ViewChildren(SortableHeader) headers!: QueryList<SortableHeader>;
  public currentSortEvent: SortEvent = { column: '', direction: '' };
  public lqNodes: Node[] = [];
  public filteredNodes: Node[] = [];
  public filter = '';
  public error: any = null;
  private unSubs: Array<Subject<void>> = [new Subject(), new Subject(), new Subject(), new Subject()];

  constructor(private lqService: LiquidityService, private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
    this.lqService.nodesListSubject.pipe(takeUntil(this.unSubs[0])).subscribe({
      next: (nodes) => {
        this.lqNodes = nodes;
        this.filteredNodes = nodes;
        console.info(this.lqNodes);
      }, error: (err) => {
        console.error(err);
        this.error = err;
      }
    });
  }

  onFilterChange(event: any) {
    this.filteredNodes = this.lqNodes.filter(lqNode => {
      const toFind = event.target.value.toLowerCase();
      return lqNode?.alias?.toLowerCase().includes(toFind)
        || lqNode.nodeid?.toLowerCase().includes(toFind)
        || lqNode.option_will_fund?.channel_fee_max_base_msat?.toString().includes(toFind)
        || lqNode.option_will_fund?.channel_fee_max_proportional_thousandths?.toString().includes(toFind)
        || lqNode.option_will_fund?.compact_lease?.toLowerCase().includes(toFind)
        || lqNode.option_will_fund?.funding_weight?.toString().includes(toFind)
        || lqNode.option_will_fund?.lease_fee_base_msat?.toString().includes(toFind)
        || lqNode.option_will_fund?.lease_fee_basis?.toString().includes(toFind);
    });
  }

  openChannelModal(lqNode: Node) {
    const modalRef = this.modalService.open(OpenChannelModalComponent);
    modalRef.componentInstance.selectedLQNode = lqNode;
  }

  showDetails(lqNode: Node) {
    this.router.navigate(['node/' + lqNode.nodeid]);
  }

  compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

  onSort({column, direction}: SortEvent) {
    this.currentSortEvent = {column, direction};
    if (this.currentSortEvent.direction === '') {
      this.currentSortEvent.column = '';
    }
    console.warn(this.currentSortEvent);
    this.headers?.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    if (direction === '' || column === '') {
      this.filteredNodes = this.lqNodes;
    } else {
      this.filteredNodes = (<any>this.lqNodes).sort((a: any, b: any) => {
        let value1 = a[column];
        let value2 = b[column];
        if (column !== 'alias') {
          value1 = +a['option_will_fund'][column];
          value2 = +b['option_will_fund'][column];
        }
        const res = this.compare(value1, value2);
        return direction === 'asc' ? res : -res;
      });
    }
  }
  
  ngOnDestroy() {
    this.unSubs.forEach((completeSub) => {
      completeSub.next();
      completeSub.complete();
    });
  }
  
}
