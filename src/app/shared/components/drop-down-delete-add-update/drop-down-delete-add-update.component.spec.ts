import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownDeleteAddUpdateComponent } from './drop-down-delete-add-update.component';

describe('DropDownDeleteAddUpdateComponent', () => {
  let component: DropDownDeleteAddUpdateComponent;
  let fixture: ComponentFixture<DropDownDeleteAddUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropDownDeleteAddUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropDownDeleteAddUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
