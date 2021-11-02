import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { FunderPolicy } from '../shared/models/store';
import { LiquidityService } from '../shared/services/liquidity.service';
import { UpdateFundingPolicyComponent } from '../update-funding-policy/update-funding-policy.component';

@Component({
  selector: 'lads-liquidity-advertisement',
  templateUrl: './liquidity-advertisement.component.html',
  styleUrls: ['./liquidity-advertisement.component.scss']
})
export class LiquidityAdvertisementComponent implements OnInit, OnDestroy {
  public funderPolicy: FunderPolicy = {};
  private unSubs: Array<Subject<void>> = [new Subject(), new Subject()];

  constructor(private lqService: LiquidityService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.lqService.funderPolicySubject.pipe(takeUntil(this.unSubs[0])).subscribe(funderPolicy => {
      this.funderPolicy = funderPolicy;
    });
  }

  updateFundingPolicy() {
    const modalRef = this.modalService.open(UpdateFundingPolicyComponent);
    modalRef.componentInstance.fundingPolicy = this.funderPolicy;

  }

  ngOnDestroy() {
    this.unSubs.forEach((completeSub) => {
      completeSub.next();
      completeSub.complete();
    });
  }

}
