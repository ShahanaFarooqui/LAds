import { Component, Input, OnInit } from '@angular/core';

import { Node, FEATURES } from '../shared/models/store';

@Component({
  selector: 'lads-liquidity-offer-node-compare',
  templateUrl: './liquidity-offer-node-compare.component.html',
  styleUrls: ['./liquidity-offer-node-compare.component.scss']
})
export class LiquidityOfferNodeCompareComponent implements OnInit {
  @Input() node: Node = {};
  featuresList: String[] = [];

  constructor() { }

  ngOnInit() {
    if (!!(parseInt(('0x' + this.node.features), 10) & ((1 << FEATURES.DATA_LOSS_PROTECT.first) | (1 << FEATURES.DATA_LOSS_PROTECT.second)))) {
      this.featuresList.push(FEATURES.DATA_LOSS_PROTECT.value);
    }
    if (!!(parseInt(('0x' + this.node.features), 10) & ((1 << FEATURES.UPFRONT_SHUTDOWN_SCRIPT.first) | (1 << FEATURES.UPFRONT_SHUTDOWN_SCRIPT.second)))) {
      this.featuresList.push(FEATURES.UPFRONT_SHUTDOWN_SCRIPT.value);
    }

  }

}
