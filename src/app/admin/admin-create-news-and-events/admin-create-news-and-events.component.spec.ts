import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateNewsAndEventsComponent } from './admin-create-news-and-events.component';

describe('AdminCreateNewsAndEventsComponent', () => {
  let component: AdminCreateNewsAndEventsComponent;
  let fixture: ComponentFixture<AdminCreateNewsAndEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCreateNewsAndEventsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCreateNewsAndEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
