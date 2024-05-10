import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminJobAlertComponent } from './admin-job-alert.component';

describe('AdminJobAlertComponent', () => {
  let component: AdminJobAlertComponent;
  let fixture: ComponentFixture<AdminJobAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminJobAlertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminJobAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
