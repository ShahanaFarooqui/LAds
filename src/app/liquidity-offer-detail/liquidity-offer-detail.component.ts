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
  node: Node = {};
  public error: any = null;
  private unSubs: Array<Subject<void>> = [new Subject(), new Subject(), new Subject(), new Subject()];

  constructor(private lqService: LiquidityService, private modalService: NgbModal, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const nodeidFromParam = (this.activatedRoute.snapshot.paramMap.get('nodeid') || '');
    this.lqService.nodesListSubject.pipe(takeUntil(this.unSubs[0])).subscribe({
      next: (nodesRes: Node[]) => {
        this.node = (nodesRes && nodesRes.length && nodesRes.length > 0) ? (nodesRes.find(nodeToCompare => nodeToCompare.nodeid === nodeidFromParam) || {}) : {};
      }, error: (err) => {
        console.error(err);
        this.error = err;
      }
    });
  }

  openChannelModal() {
    const modalRef = this.modalService.open(OpenChannelModalComponent);
    modalRef.componentInstance.selectedLQNode = this.node;
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
