import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddFeesComponent } from './admin-add-fees.component';

describe('AdminAddFeesComponent', () => {
  let component: AdminAddFeesComponent;
  let fixture: ComponentFixture<AdminAddFeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddFeesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
