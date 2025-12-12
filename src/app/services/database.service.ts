import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { Transaction } from '../models/Transaction';
@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private db: AngularFirestore) {}

  registerUser(user: firebase.User) {
    this.db.collection('users').doc(user.uid).set(
      {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
        uid: user.uid,
      },
      { merge: true }
    );

    this.db.collection('profiles').doc(user.uid).set(
      {
        name: user.displayName,
        photoURL: user.photoURL,
      },
      { merge: true }
    );

    this.initializeMoney(user);
  }

  initializeMoney(user: firebase.User): void {
    let docRef = this.getCurrentProfile(user);

    docRef.get().then((doc) => {
      if (doc.exists) {
        let data: any = doc.data();

        if (!data['startMoneyReceived']) {
          const startMoney = 10000;
          docRef.update({
            money: startMoney,
            startMoney: startMoney,
            startMoneyReceived: true,
          });

          const portfolioRef = this.getCurrentPortfolio(user);
          portfolioRef.set({}, { merge: true });
        }
      }
    });
  }

  deleteCurrency(user: firebase.User, symbol: string) {
    let userRef = this.db.collection('portfolios').doc(user.uid).ref;
    userRef.set(
      {
        [symbol]: firebase.firestore.FieldValue.delete(),
      },
      { merge: true }
    );
  }

  getCurrentPortfolio(user: firebase.User) {
    return this.db.collection('portfolios').doc(user.uid).ref;
  }

  getCurrentProfile(user: firebase.User) {
    return this.db.collection('profiles').doc(user.uid).ref;
  }

  getProfiles() {
    return this.db.collection('profiles').ref;
  }

  getPortfolios() {
    return this.db.collection('portfolios').ref;
  }

  createBatch() {
    return this.db.firestore.batch();
  }
}
