import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MessageService } from '../../../../shared/services/message.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-social-auth-form',
  templateUrl: './social-auth-form.component.html',
  styleUrls: ['./social-auth-form.component.scss']
})
export class SocialAuthFormComponent implements OnInit {
  constructor(
    private router: Router,
    private messageService: MessageService,
    private authService: AuthService
  ) { }

  ngOnInit(): void { }

  private providerSignIn(providerSignInMethod: () => Promise<void>): void {
    providerSignInMethod()
      .then(() => {
        this.messageService.showSuccess('You have successfully logged in');
        return this.router.navigate(['tasks']);
      })
      .catch((err) => {
        console.error(err);
        this.messageService.showError(err.message);
      });
  }

  onFacebookSignIn(): void {
    this.providerSignIn(
      this.authService.signInWithFacebook.bind(this.authService)
    );
  }

  onGoogleSignIn(): void {
    this.providerSignIn(
      this.authService.signInWithGoogle.bind(this.authService)
    );
  }
}
