import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditNewsAndEventsComponent } from './admin-edit-news-and-events.component';

describe('AdminEditNewsAndEventsComponent', () => {
  let component: AdminEditNewsAndEventsComponent;
  let fixture: ComponentFixture<AdminEditNewsAndEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEditNewsAndEventsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEditNewsAndEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
