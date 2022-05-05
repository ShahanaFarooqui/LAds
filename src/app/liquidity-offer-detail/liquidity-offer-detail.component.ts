import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Node } from '../shared/models/store';
import { LiquidityService } from '../shared/services/liquidity.service';
import { OpenChannelModalComponent } from '../open-channel-modal/open-channel-modal.component';

@Component({
  selector: 'lads-liquidity-offer-detail',
  templateUrl: './liquidity-offer-detail.component.html',
  styleUrls: ['./liquidity-offer-detail.component.scss']
})
export class LiquidityOfferDetailComponent implements OnInit, OnDestroy {
  node1: Node = {};
  node2: Node = {};
  public error: any = null;
  private unSubs: Array<Subject<void>> = [new Subject(), new Subject(), new Subject(), new Subject()];

  constructor(private lqService: LiquidityService, private modalService: NgbModal, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const nodeid1FromParam = (this.activatedRoute.snapshot.paramMap.get('nodeid1') || '');
    const nodeid2FromParam = (this.activatedRoute.snapshot.paramMap.get('nodeid2') || '');
    this.lqService.nodesListSubject.pipe(takeUntil(this.unSubs[0])).subscribe({
      next: (nodesRes: Node[]) => {
        this.node1 = (nodesRes && nodesRes.length && nodesRes.length > 0) ? (nodesRes.find(nodeToCompare => nodeToCompare.nodeid === nodeid1FromParam) || {}) : {};
        this.node2 = (nodesRes && nodesRes.length && nodesRes.length > 0) ? (nodesRes.find(nodeToCompare => nodeToCompare.nodeid === nodeid2FromParam) || {}) : {};
      }, error: (err) => {
        console.error(err);
        this.error = err;
      }
    });
  }

  openChannelModal() {
    const modalRef = this.modalService.open(OpenChannelModalComponent);
    modalRef.componentInstance.selectedLQNode = this.node1;
  }

  goBack() {
    this.router.navigate(['lease']);
  }

  ngOnDestroy() {
    this.unSubs.forEach((completeSub) => {
      completeSub.next();
      completeSub.complete();
    });
  }
}
