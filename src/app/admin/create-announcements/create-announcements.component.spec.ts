import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAnnouncementsComponent } from './create-announcements.component';

describe('CreateAnnouncementsComponent', () => {
  let component: CreateAnnouncementsComponent;
  let fixture: ComponentFixture<CreateAnnouncementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAnnouncementsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAnnouncementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
