import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAssignmentsComponent } from './admin-assignments.component';

describe('AdminAssignmentsComponent', () => {
  let component: AdminAssignmentsComponent;
  let fixture: ComponentFixture<AdminAssignmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAssignmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
