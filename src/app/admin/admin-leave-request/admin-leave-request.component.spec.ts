import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLeaveRequestComponent } from './admin-leave-request.component';

describe('AdminLeaveRequestComponent', () => {
  let component: AdminLeaveRequestComponent;
  let fixture: ComponentFixture<AdminLeaveRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminLeaveRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminLeaveRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
