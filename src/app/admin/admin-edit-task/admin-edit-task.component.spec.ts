import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditTaskComponent } from './admin-edit-task.component';

describe('AdminEditTaskComponent', () => {
  let component: AdminEditTaskComponent;
  let fixture: ComponentFixture<AdminEditTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEditTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEditTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
