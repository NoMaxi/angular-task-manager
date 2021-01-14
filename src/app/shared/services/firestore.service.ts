import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import firebase from 'firebase';
import WhereFilterOp = firebase.firestore.WhereFilterOp;
import { AngularFirestore, CollectionReference } from '@angular/fire/firestore';
import { DocumentReference } from '@angular/fire/firestore/interfaces';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(
    private afs: AngularFirestore
  ) { }

  getAll<T>(path: string): Observable<T[]> {
    return this.afs.collection<T>(path).valueChanges();
  }

  getByCondition<T>(
    path: string,
    key: string,
    condition: WhereFilterOp,
    keyValue: string,
    limit: number = Infinity
  ): Observable<T[]> {
    return this.afs.collection<T>(path, (ref: CollectionReference<T>) =>
      ref.where(key, condition, keyValue).limit(limit)).valueChanges();
  }

  getOneByBaseKey<T>(path: string, keyValue: string ): Observable<T> {
    return this.afs.collection<T>(path).doc(keyValue).valueChanges();
  }

  getOneByKey<T>(path: string, key: string, keyValue: string): Observable<T> {
    return this.getAll(path).pipe(
      map((data: T[]) => data.find((item: T) => item[key] === keyValue))
    );
  }

  generateId<T>(path): string {
    return this.afs.collection<T>(path).doc().ref.id;
  }

  create<T>(path: string, data: T): Promise<DocumentReference<T>> {
    return this.afs.collection<T>(path).add(data);
  }

  set<T>(path: string, keyValue: string, data: T): Promise<void> {
    return this.afs.collection<T>(path).doc(keyValue).set(data);
  }

  update<T>(path: string, keyValue: string, data: Partial<T>): Promise<void> {
    return this.afs.collection<T>(path).doc(keyValue).update(data);
  }

  delete<T>(path: string, keyValue: string): Promise<void> {
    return this.afs.collection<T>(path).doc(keyValue).delete();
  }
}
