import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';

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
  public modalRef?: BsModalRef;
  private unSubs: Array<Subject<void>> = [new Subject(), new Subject()];

  constructor(private lqService: LiquidityService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.lqService.funderPolicySubject.pipe(takeUntil(this.unSubs[0])).subscribe(funderPolicy => {
      this.funderPolicy = funderPolicy;
    });
  }

  updateFundingPolicy() {
    const initialState: ModalOptions = { initialState: { fundingPolicy: this.funderPolicy } };
    this.modalRef = this.modalService.show(UpdateFundingPolicyComponent, initialState);
  }

  ngOnDestroy() {
    this.unSubs.forEach((completeSub) => {
      completeSub.next();
      completeSub.complete();
    });
  }

}
