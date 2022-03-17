import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User as FirebaseUser } from 'firebase/auth';
import { FieldValue, serverTimestamp, deleteField } from 'firebase/firestore';
import { Transaction } from '../models/Transaction';
@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private db: AngularFirestore) {}

  registerUser(user: FirebaseUser) {
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

  initializeMoney(user: FirebaseUser): void {
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
        }
      }
    });
  }

  deleteCurrency(user: FirebaseUser, symbol: string) {
    let userRef = this.db.collection('portfolios').doc(user.uid).ref;
    userRef.set(
      {
        [symbol]: deleteField(),
      },
      { merge: true }
    );
  }

  getCurrentPortfolio(user: FirebaseUser) {
    return this.db.collection('portfolios').doc(user.uid).ref;
  }

  getCurrentProfile(user: FirebaseUser) {
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
