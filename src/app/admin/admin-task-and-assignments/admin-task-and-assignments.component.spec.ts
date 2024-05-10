import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTaskAndAssignmentsComponent } from './admin-task-and-assignments.component';

describe('AdminTaskAndAssignmentsComponent', () => {
  let component: AdminTaskAndAssignmentsComponent;
  let fixture: ComponentFixture<AdminTaskAndAssignmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTaskAndAssignmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTaskAndAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
