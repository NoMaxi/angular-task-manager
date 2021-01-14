import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { minLengths, patterns } from '../../../../shared/helpers/validation';
import { MessageService } from '../../../../shared/services/message.service';
import { GlobalAuthService } from '../../../../shared/services/global-auth.service';
import { FirestoreService } from '../../../../shared/services/firestore.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private router: Router,
    private messageService: MessageService,
    private globalAuthService: GlobalAuthService,
    private firestoreService: FirestoreService,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    const { alphabetic, email: emailPattern } = patterns;
    this.registerForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern(alphabetic)
      ]),
      surname: new FormControl('', [
        Validators.required,
        Validators.pattern(alphabetic)
      ]),
      company: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(emailPattern)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(minLengths.password)
      ])
    });
  }

  onRegisterSubmit(): void {
    this.authService.register(this.registerForm.value)
      .then(() => this.router.navigate(['tasks']))
      .then(() =>
        this.messageService.showSuccess('You have been successfully registered')
      )
      .catch((err) => {
        console.error(err);
        this.messageService.showError(err.message);
      });
  }
}
