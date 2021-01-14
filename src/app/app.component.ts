import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { GlobalAuthService } from './shared/services/global-auth.service';
import { CurrentUserStoreService } from './shared/services/current-user-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'angular-task-manager';
  private subscription: Subscription;

  constructor(
    private globalAuthService: GlobalAuthService,
    private currentUserStoreService: CurrentUserStoreService
  ) { }

  ngOnInit(): void {
    this.subscription = this.currentUserStoreService.initCurrentUser();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
