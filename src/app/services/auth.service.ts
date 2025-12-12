import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import 'firebase/auth';
import { DatabaseService } from './database.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  User: firebase.User | undefined;

  constructor(public auth: AngularFireAuth, private db: DatabaseService) {
    this.auth.onAuthStateChanged((user) => {
      this.User = user as firebase.User;

      if (this.User) {
        this.db.registerUser(this.User);
      }
    });
  }

  GoogleAuth() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }

  AuthLogin(provider: any) {
    return this.auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log('You have been successfully logged in!');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  logout() {
    this.auth
      .signOut()
      .then(() => {
        console.log('You have been successfully logged out!');
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
