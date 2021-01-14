import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import FirebaseUser = firebase.User;
import FirebaseUserCredential = firebase.auth.UserCredential;
import FirebaseAuthProvider = firebase.auth.AuthProvider;

import { User } from '../../../shared/interfaces/user';
import { UserService } from '../../../shared/services/user.service';
import { CurrentUserStoreService } from '../../../shared/services/current-user-store.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private userService: UserService,
    private currentUserStoreService: CurrentUserStoreService
  ) {
    this.afAuth.authState.subscribe((user: FirebaseUser) => {
      if (user) {
        localStorage.setItem('uid', JSON.stringify(user.uid));
      } else {
        localStorage.setItem('uid', null);
      }
    });
  }

  login(credentials: Partial<User>): Promise<void> {
    const { email, password } = credentials;
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((data: FirebaseUserCredential) => {
        this.userService.getUserById(data.user.uid)
          .pipe(first())
          .subscribe((user: User) => {
              if (user) {
                this.currentUserStoreService.data = user;
                return Promise.resolve(user);
              }
            },
            (err) => {
              console.error(err);
              return Promise.reject();
            }
          );
      });
  }

  register(userData: User): Promise<void> {
    const { name, surname, company, email, password } = userData;
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((data: FirebaseUserCredential) => Promise.all([
        data.user.updateProfile({ displayName: name }),
        this.userService.addNewUser({
          name, surname, company, email, id: data.user.uid
        })
      ]))
      .then(() => {
        this.afAuth.authState
          .pipe(first())
          .subscribe((user: FirebaseUser) => {
              if (user) {
                localStorage.setItem('uid', JSON.stringify(user.uid));
                this.currentUserStoreService.data = {
                  name, surname, company, email, id: user.uid
                };
                return Promise.resolve(user);
              }
            },
            (err) => {
              console.error(err);
              return Promise.reject();
            }
          );
      });
  }

  private signInWithProvider(provider: FirebaseAuthProvider): Promise<void> {
    return this.afAuth.signInWithPopup(provider)
      .then((data: FirebaseUserCredential) => {
        const { displayName: name, email, uid: id } = data.user;
        return this.userService.addNewUser({ name, email, id });
      })
      .then(() => {
        this.afAuth.authState.pipe(first())
          .subscribe((user: FirebaseUser) => {
              if (user) {
                localStorage.setItem('uid', JSON.stringify(user.uid));
                const { displayName: name, email, uid: id } = user;
                this.currentUserStoreService.data = { name, email, id };
                return Promise.resolve(this.currentUserStoreService.data);
              }
            },
            (err) => {
              console.error(err);
              return Promise.reject();
            }
          );
      });
  }

  signInWithFacebook(): Promise<void> {
    return this.signInWithProvider(new firebase.auth.FacebookAuthProvider());
  }

  signInWithGoogle(): Promise<void> {
    return this.signInWithProvider(new firebase.auth.GoogleAuthProvider());
  }
}
