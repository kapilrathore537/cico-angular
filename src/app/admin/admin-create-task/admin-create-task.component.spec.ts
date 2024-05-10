import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateTaskComponent } from './admin-create-task.component';

describe('AdminCreateTaskComponent', () => {
  let component: AdminCreateTaskComponent;
  let fixture: ComponentFixture<AdminCreateTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCreateTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCreateTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
