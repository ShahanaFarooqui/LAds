import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { FunderPolicy } from '../shared/models/store';
import { LiquidityService } from '../shared/services/liquidity.service';

@Component({
  selector: 'lads-update-funding-policy',
  templateUrl: './update-funding-policy.component.html',
  styleUrls: ['./update-funding-policy.component.scss']
})
export class UpdateFundingPolicyComponent implements OnInit, OnDestroy {
  @Input() fundingPolicy: FunderPolicy = {};
  public policy = '';
  public policyMod: any;
  public leaseFeeBaseSat: any;
  public leaseFeeBasis: any;
  public channelFeeMaxBaseSat: any;
  public channelFeeMaxProportional: any;
  public errorMsg = '';
  public successMsg = '';
  public progressVal = 10;
  public pbInterval: any;
  public isInProgress = false;
  private unSubs: Array<Subject<void>> = [new Subject()];

  constructor(private lqService: LiquidityService, public modal: NgbActiveModal) {}

  ngOnInit(): void { 
    console.info(this.fundingPolicy);
    this.policy = !this.fundingPolicy.policy ? '' : this.fundingPolicy.policy;
    this.policyMod = this.fundingPolicy.policy_mod !== 0 && !this.fundingPolicy.policy_mod ? null : this.fundingPolicy.policy_mod;
    this.leaseFeeBaseSat = this.fundingPolicy.lease_fee_base_msat !== 0 && !this.fundingPolicy.lease_fee_base_msat ? null : this.fundingPolicy.lease_fee_base_msat / 1000;
    this.leaseFeeBasis = this.fundingPolicy.lease_fee_basis !== 0 && !this.fundingPolicy.lease_fee_basis ? null : this.fundingPolicy.lease_fee_basis;
    this.channelFeeMaxBaseSat = this.fundingPolicy.channel_fee_max_base_msat !== 0 && !this.fundingPolicy.channel_fee_max_base_msat ? null : this.fundingPolicy.channel_fee_max_base_msat / 1000;
    this.channelFeeMaxProportional = this.fundingPolicy.channel_fee_max_proportional_thousandths !== 0 && !this.fundingPolicy.channel_fee_max_proportional_thousandths? null : this.fundingPolicy.channel_fee_max_proportional_thousandths;
  }

  updateFundingPolicy() {
    this.isInProgress = true;
    this.errorMsg = '';
    this.successMsg = '';
    this.pbInterval = setInterval(() => { this.progressVal = this.progressVal + 1 }, 1000); 
    this.lqService.updatePolicy(this.policy, this.policyMod, this.leaseFeeBaseSat, this.leaseFeeBasis, this.channelFeeMaxBaseSat*1000, this.channelFeeMaxProportional)
    .pipe(takeUntil(this.unSubs[0]))
    .subscribe((updatePolicyRes: any) => {
      console.info(updatePolicyRes);
      this.fundingPolicy = updatePolicyRes;
      this.lqService.updateStore(this.fundingPolicy, 'FU');
      this.reset();
      this.successMsg = 'Compact Lease: ' + updatePolicyRes.compact_lease;
    }, error => {
      console.error(error);
      this.reset();
      this.errorMsg = JSON.stringify(error.error.error.message);
    });
  }

  reset() {
    this.isInProgress = false;
    this.policy = !this.fundingPolicy.policy ? '' : this.fundingPolicy.policy;
    this.policyMod = this.fundingPolicy.policy_mod !== 0 && !this.fundingPolicy.policy_mod ? null : this.fundingPolicy.policy_mod;
    this.leaseFeeBaseSat = this.fundingPolicy.lease_fee_base_msat !== 0 && !this.fundingPolicy.lease_fee_base_msat ? null : this.fundingPolicy.lease_fee_base_msat / 1000;
    this.leaseFeeBasis = this.fundingPolicy.lease_fee_basis !== 0 && !this.fundingPolicy.lease_fee_basis ? null : this.fundingPolicy.lease_fee_basis;
    this.channelFeeMaxBaseSat = this.fundingPolicy.channel_fee_max_base_msat !== 0 && !this.fundingPolicy.channel_fee_max_base_msat ? null : this.fundingPolicy.channel_fee_max_base_msat / 1000;
    this.channelFeeMaxProportional = this.fundingPolicy.channel_fee_max_proportional_thousandths !== 0 && !this.fundingPolicy.channel_fee_max_proportional_thousandths? null : this.fundingPolicy.channel_fee_max_proportional_thousandths;
    this.successMsg = '';
    this.errorMsg = '';
  }
  
  ngOnDestroy() {
    clearInterval(this.pbInterval);
    this.unSubs.forEach((completeSub) => {
      completeSub.next();
      completeSub.complete();
    });
  }

}
