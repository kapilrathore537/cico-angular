import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateNewJobComponent } from './admin-create-new-job.component';

describe('AdminCreateNewJobComponent', () => {
  let component: AdminCreateNewJobComponent;
  let fixture: ComponentFixture<AdminCreateNewJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCreateNewJobComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCreateNewJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
