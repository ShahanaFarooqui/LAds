import { Component, OnInit, Input } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';

import { Node } from '../shared/models/store';
import { LiquidityService } from '../shared/services/liquidity.service';
import { OpenChannelModalComponent } from '../open-channel-modal/open-channel-modal.component';

@Component({
  selector: 'lads-liquidity-offer-detail',
  templateUrl: './liquidity-offer-detail.component.html',
  styleUrls: ['./liquidity-offer-detail.component.scss']
})
export class LiquidityOfferDetailComponent implements OnInit {
  public modalRef?: BsModalRef;
  @Input() node: Node = {};

  constructor(private lqService: LiquidityService, private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  updateCompareList() {
    this.node.compare = !this.node.compare;
    this.lqService.updateCompareNodesList(this.node);
  }

  openChannelModal() {
    const initialState: ModalOptions = { initialState: { selectedLQNode: this.node } };
    this.modalRef = this.modalService.show(OpenChannelModalComponent, initialState);
  }
}
