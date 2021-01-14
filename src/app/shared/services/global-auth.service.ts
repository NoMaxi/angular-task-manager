import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class GlobalAuthService {
  constructor(
    private afAuth: AngularFireAuth
  ) { }

  get isLoggedIn(): boolean {
    return JSON.parse(localStorage.getItem('uid')) !== null;
  }

  get currentUserId(): string {
    return JSON.parse(localStorage.getItem('uid'));
  }

  logoutCurrentUser(): Promise<void> {
    return this.afAuth.signOut()
      .then(() => localStorage.removeItem('uid'));
  }
}
