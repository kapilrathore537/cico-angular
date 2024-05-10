import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewsAndEventComponent } from './admin-news-and-event.component';

describe('AdminNewsAndEventComponent', () => {
  let component: AdminNewsAndEventComponent;
  let fixture: ComponentFixture<AdminNewsAndEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminNewsAndEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminNewsAndEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
