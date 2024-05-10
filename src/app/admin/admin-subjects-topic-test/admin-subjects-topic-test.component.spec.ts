import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSubjectsTopicTestComponent } from './admin-subjects-topic-test.component';

describe('AdminSubjectsTopicTestComponent', () => {
  let component: AdminSubjectsTopicTestComponent;
  let fixture: ComponentFixture<AdminSubjectsTopicTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSubjectsTopicTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSubjectsTopicTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
