import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailConfirmedComponent } from './email-confirmed.component';

describe('EmailConfirmedComponent', () => {
  let component: EmailConfirmedComponent;
  let fixture: ComponentFixture<EmailConfirmedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmailConfirmedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmailConfirmedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
