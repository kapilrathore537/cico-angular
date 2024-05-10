import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChapterResultComponent } from './admin-chapter-result.component';

describe('AdminChapterResultComponent', () => {
  let component: AdminChapterResultComponent;
  let fixture: ComponentFixture<AdminChapterResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminChapterResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminChapterResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
