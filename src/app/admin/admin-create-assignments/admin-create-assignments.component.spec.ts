import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateAssignmentsComponent } from './admin-create-assignments.component';

describe('AdminCreateAssignmentsComponent', () => {
  let component: AdminCreateAssignmentsComponent;
  let fixture: ComponentFixture<AdminCreateAssignmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCreateAssignmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCreateAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
