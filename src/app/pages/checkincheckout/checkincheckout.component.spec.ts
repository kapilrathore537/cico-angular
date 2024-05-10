import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckincheckoutComponent } from './checkincheckout.component';

describe('CheckincheckoutComponent', () => {
  let component: CheckincheckoutComponent;
  let fixture: ComponentFixture<CheckincheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckincheckoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckincheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
