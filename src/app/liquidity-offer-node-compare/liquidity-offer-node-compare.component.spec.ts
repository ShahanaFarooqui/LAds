import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiquidityOfferNodeCompareComponent } from './liquidity-offer-node-compare.component';

describe('LiquidityOfferNodeCompareComponent', () => {
  let component: LiquidityOfferNodeCompareComponent;
  let fixture: ComponentFixture<LiquidityOfferNodeCompareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LiquidityOfferNodeCompareComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiquidityOfferNodeCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
