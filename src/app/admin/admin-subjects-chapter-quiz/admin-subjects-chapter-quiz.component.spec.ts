import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSubjectsChapterQuizComponent } from './admin-subjects-chapter-quiz.component';

describe('AdminSubjectsChapterQuizComponent', () => {
  let component: AdminSubjectsChapterQuizComponent;
  let fixture: ComponentFixture<AdminSubjectsChapterQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSubjectsChapterQuizComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSubjectsChapterQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
