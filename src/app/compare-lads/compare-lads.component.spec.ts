import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareLadsComponent } from './compare-lads.component';

describe('CompareLadsComponent', () => {
  let component: CompareLadsComponent;
  let fixture: ComponentFixture<CompareLadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareLadsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareLadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
