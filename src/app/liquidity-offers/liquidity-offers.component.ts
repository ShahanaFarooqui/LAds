import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';

import { Node } from '../shared/models/store';
import { LiquidityService } from '../shared/services/liquidity.service';
import { OpenChannelModalComponent } from '../open-channel-modal/open-channel-modal.component';

@Component({
  selector: 'lads-liquidity-offers',
  templateUrl: './liquidity-offers.component.html',
  styleUrls: ['./liquidity-offers.component.scss']
})
export class LiquidityOffersComponent implements OnInit, OnDestroy {
  public modalRef?: BsModalRef;
  public addr = '';
  public lqNodes: Node[] = [];
  public error: any = null;
  private unSubs: Array<Subject<void>> = [new Subject(), new Subject(), new Subject(), new Subject(), new Subject(), new Subject(), new Subject(), new Subject(), new Subject(), new Subject(), new Subject(), new Subject(), new Subject()];

  constructor(private lqService: LiquidityService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.lqService.listLQNodes();
    this.lqService.nodesListSubject.pipe(takeUntil(this.unSubs[0])).subscribe({
      next: (nodes) => {
        this.lqNodes = nodes;
        console.info(this.lqNodes);
      }, error: (err) => {
        console.error(err);
        this.error = err;
      }
    });
  }

  updateCompareList(node: Node) {
    node.compare = !node.compare;
    this.lqService.updateCompareNodesList(node);
  }

  showHideDetails(lqNode: Node) {
    this.lqNodes.forEach(node => {
      if (node.nodeid === lqNode.nodeid) {
        node.showDetails = !node.showDetails;
      }
      return node;
    });
  }

  openChannelModal(lqNode: Node) {
    const initialState: ModalOptions = { initialState: { selectedLQNode: lqNode } };
    this.modalRef = this.modalService.show(OpenChannelModalComponent, initialState);
  }

  ngOnDestroy() {
    this.unSubs.forEach((completeSub) => {
      completeSub.next();
      completeSub.complete();
    });
  }
  
}
