import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User as FirebaseUser } from 'firebase/auth';
import { Transaction } from '../models/Transaction';
@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private firestore: AngularFirestore) {}

  async registerUser(user: FirebaseUser | undefined) {
    if (!user) {
      return;
    }
    this.firestore.collection('users').doc(user.uid).set(
      {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
      },
      { merge: true }
    );

    this.initializeMoney(user);
  }

  initializeMoney(user: FirebaseUser): void {
    let docRef = this.firestore.collection('users').doc(user.uid).ref;

    docRef.get().then((doc) => {
      if (doc.exists) {
        let data: any = doc.data();

        if (!data['money']) {
          const startMoney = 10000;
          docRef.update({ money: startMoney, startMoney: startMoney });
        }
      }
    });
  }

  updatePortfolio(user: FirebaseUser, transaction: Transaction) {
    let portfolios = this.firestore.collection<any>('portfolios');

    let portfolio = portfolios.doc(user.uid);
    let symbol = transaction.symbol;

    portfolio.get().subscribe((doc) => {
      let data = doc.data();
      let update: any = {};

      if (data) {
        let oldAmount = data[symbol];

        if (!oldAmount) {
          oldAmount = 0;
        }

        let newAmount = oldAmount + transaction.amount;

        update[symbol] = newAmount;
      } else {
        update[symbol] = transaction.amount;
      }

      portfolio.set(update, { merge: true });
    });
  }

  updateUser(user: FirebaseUser, update: any) {
    let userRef = this.firestore.collection('users').doc(user.uid).ref;
    userRef.set(update, { merge: true });
  }

  getCurrentPortfolio(user: FirebaseUser) {
    return this.firestore.collection('portfolios').doc(user.uid).ref;
  }

  getCurrentUser(user: FirebaseUser) {
    return this.firestore.collection('users').doc(user.uid).ref;
  }
}
