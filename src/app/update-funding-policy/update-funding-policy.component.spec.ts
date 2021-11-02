import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFundingPolicyComponent } from './update-funding-policy.component';

describe('UpdateFundingPolicyComponent', () => {
  let component: UpdateFundingPolicyComponent;
  let fixture: ComponentFixture<UpdateFundingPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateFundingPolicyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateFundingPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
