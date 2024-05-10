import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditAssignmentsComponent } from './admin-edit-assignments.component';

describe('AdminEditAssignmentsComponent', () => {
  let component: AdminEditAssignmentsComponent;
  let fixture: ComponentFixture<AdminEditAssignmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEditAssignmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEditAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
