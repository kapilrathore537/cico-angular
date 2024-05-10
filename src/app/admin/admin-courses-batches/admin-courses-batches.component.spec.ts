import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCoursesBatchesComponent } from './admin-courses-batches.component';

describe('AdminCoursesBatchesComponent', () => {
  let component: AdminCoursesBatchesComponent;
  let fixture: ComponentFixture<AdminCoursesBatchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCoursesBatchesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCoursesBatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
