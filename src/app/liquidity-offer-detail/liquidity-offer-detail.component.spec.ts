import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiquidityOfferDetailComponent } from './liquidity-offer-detail.component';

describe('LiquidityOfferDetailComponent', () => {
  let component: LiquidityOfferDetailComponent;
  let fixture: ComponentFixture<LiquidityOfferDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiquidityOfferDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiquidityOfferDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
