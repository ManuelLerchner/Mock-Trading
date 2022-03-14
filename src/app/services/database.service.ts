import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User as FirebaseUser } from 'firebase/auth';
import { Transaction } from '../models/Transaction';
@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private firestore: AngularFirestore) {}

  registerUser(user: FirebaseUser): void {
    this.firestore.collection('users').doc(user.uid).update({
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    });

    this.initializeMoney(user);
  }

  initializeMoney(user: FirebaseUser): void {
    let docRef = this.firestore.collection('users').doc(user.uid).ref;

    docRef.get().then((doc) => {
      if (doc.exists) {
        let data: any = doc.data();

        if (!data['money']) {
          docRef.update({ money: 10000 });
        }
      }
    });
  }

  updatePortfolio(user: FirebaseUser, transaction: Transaction) {
    let portfolios = this.firestore.collection<any>('portfolios');

    let portfolio = portfolios.doc(user.uid);
    let symbol = transaction.symbol;

    portfolio.get().subscribe((doc) => {
      let oldAmount = doc.data()[symbol] | 0;
      let newAmount = oldAmount + transaction.amount;

      let update: any = {};
      update[symbol] = newAmount;

      portfolio.update(update);
    });
  }

  getCurrentPortfolio(user: FirebaseUser) {
    return this.firestore.collection('portfolios').doc(user.uid).ref;
  }
}
