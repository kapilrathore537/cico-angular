import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskAndAssignmentSubmissionComponent } from './task-and-assignment-submission.component';

describe('TaskAndAssignmentSubmissionComponent', () => {
  let component: TaskAndAssignmentSubmissionComponent;
  let fixture: ComponentFixture<TaskAndAssignmentSubmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskAndAssignmentSubmissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskAndAssignmentSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
