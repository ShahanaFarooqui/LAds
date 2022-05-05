import { Component, OnInit } from '@angular/core';
import { LiquidityService } from './shared/services/liquidity.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private lqService: LiquidityService) { }

  ngOnInit(): void {
    this.lqService.getNodeInfo();
    this.lqService.listLQNodes();
    this.lqService.funderUpdatePolicy();
  }

}
