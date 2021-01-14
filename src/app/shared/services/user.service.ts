import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { User } from '../interfaces/user';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersPath: string = environment.firestorePaths.users;

  constructor(
    private firestoreService: FirestoreService,
  ) { }

  getUsers(): Observable<User[]> {
    return this.firestoreService.getAll<User>(this.usersPath);
  }

  getUserById(id: string): Observable<User> {
     return this.firestoreService.getOneByBaseKey(this.usersPath, id);
  }

  addNewUser(user: User): Promise<void> {
    return this.firestoreService.set(this.usersPath, user.id, user);
  }
}
