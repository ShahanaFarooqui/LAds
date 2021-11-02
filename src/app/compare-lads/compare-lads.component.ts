import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Node } from '../shared/models/store';
import { LiquidityService } from '../shared/services/liquidity.service';

@Component({
  selector: 'lads-compare-lads',
  templateUrl: './compare-lads.component.html',
  styleUrls: ['./compare-lads.component.scss']
})
export class CompareLadsComponent implements OnInit {
  public nodesToCompare: Node[] = [];
  private unSubs: Array<Subject<void>> = [new Subject(), new Subject(), new Subject(), new Subject(), new Subject(), new Subject(), new Subject(), new Subject(), new Subject(), new Subject(), new Subject(), new Subject(), new Subject()];

  constructor(private lqService: LiquidityService) { }

  ngOnInit(): void {
    this.lqService.nodesToCompareSubject.pipe(takeUntil(this.unSubs[0])).subscribe({
      next: (nodes) => {      
        this.nodesToCompare = nodes;
        console.info(this.nodesToCompare);
      }, error: (err) => {
        console.error(err);
      }
    });
  }

}
