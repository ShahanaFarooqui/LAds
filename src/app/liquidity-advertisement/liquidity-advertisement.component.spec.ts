import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiquidityAdvertisementComponent } from './liquidity-advertisement.component';

describe('LiquidityAdvertisementComponent', () => {
  let component: LiquidityAdvertisementComponent;
  let fixture: ComponentFixture<LiquidityAdvertisementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiquidityAdvertisementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiquidityAdvertisementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
