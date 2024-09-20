import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginToggleComponent } from './login-toggle.component';

describe('LoginToggleComponent', () => {
  let component: LoginToggleComponent;
  let fixture: ComponentFixture<LoginToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginToggleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
