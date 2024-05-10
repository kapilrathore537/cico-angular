import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFeesPendingComponent } from './admin-fees-pending.component';

describe('AdminFeesPendingComponent', () => {
  let component: AdminFeesPendingComponent;
  let fixture: ComponentFixture<AdminFeesPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFeesPendingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFeesPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
