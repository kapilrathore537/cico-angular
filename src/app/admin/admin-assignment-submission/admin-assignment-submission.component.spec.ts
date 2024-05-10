import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAssignmentSubmissionComponent } from './admin-assignment-submission.component';

describe('AdminAssignmentSubmissionComponent', () => {
  let component: AdminAssignmentSubmissionComponent;
  let fixture: ComponentFixture<AdminAssignmentSubmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAssignmentSubmissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAssignmentSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
