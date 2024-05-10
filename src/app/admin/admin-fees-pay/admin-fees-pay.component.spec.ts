import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFeesPayComponent } from './admin-fees-pay.component';

describe('AdminFeesPayComponent', () => {
  let component: AdminFeesPayComponent;
  let fixture: ComponentFixture<AdminFeesPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFeesPayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFeesPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
