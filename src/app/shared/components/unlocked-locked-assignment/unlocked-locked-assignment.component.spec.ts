import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnlockedLockedAssignmentComponent } from './unlocked-locked-assignment.component';

describe('UnlockedLockedAssignmentComponent', () => {
  let component: UnlockedLockedAssignmentComponent;
  let fixture: ComponentFixture<UnlockedLockedAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnlockedLockedAssignmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnlockedLockedAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
