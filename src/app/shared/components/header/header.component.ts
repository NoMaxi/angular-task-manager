import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { initialUserData, User } from '../../interfaces/user';
import { GlobalAuthService } from '../../services/global-auth.service';
import { CurrentUserStoreService } from '../../services/current-user-store.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  isLoggedIn: boolean;
  user: User;

  constructor(
    private router: Router,
    private messageService: MessageService,
    private globalAuthService: GlobalAuthService,
    private currentUserStoreService: CurrentUserStoreService
  ) { }

  ngOnInit(): void {
    this.subscription = this.currentUserStoreService.userWatcher
      .subscribe((user: User) => {
          if (user.id) {
            this.user = user;
          }
          this.isLoggedIn = this.globalAuthService.isLoggedIn;
        },
        (err) => console.error(err)
      );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onLogout(): void {
    this.globalAuthService.logoutCurrentUser()
      .then(() => {
        this.currentUserStoreService.data = initialUserData;
        return this.router.navigate(['auth/login']);
      })
      .then(() => this.messageService.showInfo('You are logged out'))
      .catch((err) => {
        console.error(err);
        this.messageService.showError(err.message);
      });
  }
}
