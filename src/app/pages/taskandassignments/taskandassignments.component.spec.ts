import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskandassignmentsComponent } from './taskandassignments.component';

describe('TaskandassignmentsComponent', () => {
  let component: TaskandassignmentsComponent;
  let fixture: ComponentFixture<TaskandassignmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskandassignmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskandassignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
