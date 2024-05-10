import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFeesCompletedListComponent } from './admin-fees-completed-list.component';

describe('AdminFeesCompletedListComponent', () => {
  let component: AdminFeesCompletedListComponent;
  let fixture: ComponentFixture<AdminFeesCompletedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFeesCompletedListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFeesCompletedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
