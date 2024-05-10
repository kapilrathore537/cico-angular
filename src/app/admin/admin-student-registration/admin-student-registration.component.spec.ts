import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStudentRegistrationComponent } from './admin-student-registration.component';

describe('AdminStudentRegistrationComponent', () => {
  let component: AdminStudentRegistrationComponent;
  let fixture: ComponentFixture<AdminStudentRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStudentRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminStudentRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
