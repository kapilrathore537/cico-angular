import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditJobAlertComponent } from './admin-edit-job-alert.component';

describe('AdminEditJobAlertComponent', () => {
  let component: AdminEditJobAlertComponent;
  let fixture: ComponentFixture<AdminEditJobAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEditJobAlertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEditJobAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
