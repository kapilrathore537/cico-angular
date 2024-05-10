import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmogiComponent } from './emogi.component';

describe('EmogiComponent', () => {
  let component: EmogiComponent;
  let fixture: ComponentFixture<EmogiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmogiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmogiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
