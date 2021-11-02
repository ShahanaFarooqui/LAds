import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Node } from '../shared/models/store';
import { LiquidityService } from '../shared/services/liquidity.service';

@Component({
  selector: 'lads-open-channel-modal',
  templateUrl: './open-channel-modal.component.html',
  styleUrls: ['./open-channel-modal.component.scss']
})
export class OpenChannelModalComponent implements OnInit, OnDestroy {
  @Input() selectedLQNode: Node = {};
  public isInvalid = { ra: false, nu: false };
  public requestAmount: any = null;
  public feeRate: any = null;
  public localAmount: any = null;
  public errorMsg = '';
  public successMsg = '';
  public progressVal = 10;
  public pbInterval: any;
  public isInProgress = false;
  public isEditUri = false;
  public total = 0;
  public nodeUri = '';
  public initNodeUri = '';
  private unSubs: Array<Subject<void>> = [new Subject()];

  constructor(private lqService: LiquidityService, public modal: NgbActiveModal) {}

  ngOnInit(): void { 
    console.info(this.selectedLQNode);
    let myNode = this.lqService.getMyNode();
    let addrType = (!myNode || !myNode.address?.length || myNode.address.length === 0) ? '' : myNode.address[0].type;
    const foundAddrType = this.selectedLQNode.addresses?.find(address => address.type === addrType);
    this.nodeUri = this.selectedLQNode.nodeid + '@' + (foundAddrType?.address || '') + ':' + (foundAddrType?.port || '');
    this.initNodeUri = this.nodeUri;
  }

  onValuesChange() {
    this.successMsg = '';
    this.errorMsg = '';
    this.total = +(+((this.selectedLQNode.option_will_fund?.lease_fee_base_msat || 0)/1000) || 0) + +((+(this.selectedLQNode.option_will_fund?.lease_fee_basis || 0)/10000) * +this.requestAmount) + +(+(+(this.selectedLQNode.option_will_fund?.channel_fee_max_proportional_thousandths || 0)/4) * +this.feeRate);
  }

  openChannel() {
    if (!this.requestAmount || this.nodeUri === '') {
      if (!this.requestAmount) { this.isInvalid.ra = true; }
      if (this.nodeUri === '') { this.isInvalid.nu = true; }
      return;
    }
    this.isInvalid = { ra: false, nu: false };
    this.isInProgress = true;
    this.errorMsg = '';
    this.successMsg = '';
    this.pbInterval = setInterval(() => { this.progressVal = this.progressVal + 1 }, 1000); 
    this.lqService.openChannel(this.nodeUri, this.selectedLQNode.option_will_fund?.compact_lease || '', this.requestAmount, this.feeRate, this.localAmount)
    .pipe(takeUntil(this.unSubs[0]))
    .subscribe((fundChannelRes: any) => {
      this.total = 0;
      console.info(fundChannelRes);
      this.reset();
      this.successMsg = JSON.stringify(fundChannelRes);
    }, error => {
      console.error(error);
      this.isInProgress = false;
      this.successMsg = '';
      this.errorMsg = JSON.stringify(error.error.error.message);
    });
  }

  reset() {
    this.total = 0;
    this.isInvalid = { ra: false, nu: false };
    this.isInProgress = false;
    this.successMsg = '';
    this.errorMsg = '';
    this.localAmount = null;
    this.requestAmount = null;
    this.feeRate = null;
    this.isEditUri = false;
    this.nodeUri = this.initNodeUri;
  }
  
  onEdit() {
    this.isEditUri = !this.isEditUri;
  }

  ngOnDestroy() {
    clearInterval(this.pbInterval);
    this.unSubs.forEach((completeSub) => {
      completeSub.next();
      completeSub.complete();
    });
  }
}
