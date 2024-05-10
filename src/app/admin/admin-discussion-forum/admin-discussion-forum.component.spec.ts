import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDiscussionForumComponent } from './admin-discussion-forum.component';

describe('AdminDiscussionForumComponent', () => {
  let component: AdminDiscussionForumComponent;
  let fixture: ComponentFixture<AdminDiscussionForumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDiscussionForumComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDiscussionForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
