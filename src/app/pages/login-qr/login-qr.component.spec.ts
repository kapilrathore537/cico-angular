import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginQRComponent } from './login-qr.component';

describe('LoginQRComponent', () => {
  let component: LoginQRComponent;
  let fixture: ComponentFixture<LoginQRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginQRComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginQRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
