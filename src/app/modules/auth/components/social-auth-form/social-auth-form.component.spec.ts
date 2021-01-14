import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialAuthFormComponent } from './social-auth-form.component';

describe('SocialAuthFormComponent', () => {
  let component: SocialAuthFormComponent;
  let fixture: ComponentFixture<SocialAuthFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialAuthFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialAuthFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
