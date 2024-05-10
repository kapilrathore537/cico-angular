import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditFeesComponent } from './admin-edit-fees.component';

describe('AdminEditFeesComponent', () => {
  let component: AdminEditFeesComponent;
  let fixture: ComponentFixture<AdminEditFeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEditFeesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEditFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
