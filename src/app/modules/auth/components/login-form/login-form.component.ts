import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { patterns, minLengths } from '../../../../shared/helpers/validation';
import { MessageService } from '../../../../shared/services/message.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private messageService: MessageService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(patterns.email)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(minLengths.password)
      ])
    });
  }

  onLoginSubmit(): void {
    this.authService.login(this.loginForm.value)
      .then(() => {
        this.messageService.showSuccess('You have successfully logged in');
        return this.router.navigate(['tasks']);
      })
      .catch((err) => {
        console.error(err);
        this.messageService.showError(err.message);
        this.loginForm.reset();
      });
  }
}
