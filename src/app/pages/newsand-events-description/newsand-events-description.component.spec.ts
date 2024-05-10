import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsandEventsDescriptionComponent } from './newsand-events-description.component';

describe('NewsandEventsDescriptionComponent', () => {
  let component: NewsandEventsDescriptionComponent;
  let fixture: ComponentFixture<NewsandEventsDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsandEventsDescriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsandEventsDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
