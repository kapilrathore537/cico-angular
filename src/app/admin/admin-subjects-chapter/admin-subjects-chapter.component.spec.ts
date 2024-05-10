import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSubjectsChapterComponent } from './admin-subjects-chapter.component';

describe('AdminSubjectsChapterComponent', () => {
  let component: AdminSubjectsChapterComponent;
  let fixture: ComponentFixture<AdminSubjectsChapterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSubjectsChapterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSubjectsChapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
