import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsandeventsComponent } from './newsandevents.component';

describe('NewsandeventsComponent', () => {
  let component: NewsandeventsComponent;
  let fixture: ComponentFixture<NewsandeventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsandeventsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsandeventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
