import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenChannelModalComponent } from './open-channel-modal.component';

describe('OpenChannelModalComponent', () => {
  let component: OpenChannelModalComponent;
  let fixture: ComponentFixture<OpenChannelModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenChannelModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenChannelModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
