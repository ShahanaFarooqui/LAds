import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiquidityOffersComponent } from './liquidity-offers.component';

describe('LiquidityOffersComponent', () => {
  let component: LiquidityOffersComponent;
  let fixture: ComponentFixture<LiquidityOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiquidityOffersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiquidityOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
