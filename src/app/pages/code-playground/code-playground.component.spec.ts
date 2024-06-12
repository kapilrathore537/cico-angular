import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodePlaygroundComponent } from './code-playground.component';

describe('CodePlaygroundComponent', () => {
  let component: CodePlaygroundComponent;
  let fixture: ComponentFixture<CodePlaygroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodePlaygroundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodePlaygroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
