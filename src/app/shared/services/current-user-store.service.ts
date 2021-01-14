import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { initialUserData, User } from '../interfaces/user';
import { GlobalAuthService } from './global-auth.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserStoreService {
  private currentUser: User = { ...initialUserData };
  private userWatcherSource: BehaviorSubject<User> =
    new BehaviorSubject<User>(this.data);
  public userWatcher: Observable<User> =
    this.userWatcherSource.asObservable();

  constructor(
    private globalAuthService: GlobalAuthService,
    private userService: UserService
  ) { }

  get data(): User {
    return this.currentUser;
  }

  set data(user: User) {
    this.currentUser = { ...user };
    this.userWatcherSource.next({ ...user });
  }

  initCurrentUser(): Subscription {
    if (this.globalAuthService.isLoggedIn) {
      const userId = this.globalAuthService.currentUserId;
      return this.userService.getUserById(userId).subscribe(
        (user: User) => {
          if (user.id) {
            this.data = user;
          }
        },
        (err) => console.error(err)
      );
    }
  }
}
