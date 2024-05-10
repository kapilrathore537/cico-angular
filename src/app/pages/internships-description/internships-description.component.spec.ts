import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternshipsDescriptionComponent } from './internships-description.component';

describe('InternshipsDescriptionComponent', () => {
  let component: InternshipsDescriptionComponent;
  let fixture: ComponentFixture<InternshipsDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternshipsDescriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternshipsDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
