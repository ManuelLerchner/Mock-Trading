import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { CurrencyComponent } from './components/currency/currency.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignInComponent } from './components/signin/signin.component';
import { AuthService } from './services/auth.service';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { registerLocaleData } from '@angular/common';
import localeUSA from '@angular/common/locales/en-US-POSIX';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PositivePipe } from './pipes/positive.pipe';

registerLocaleData(localeUSA);

@NgModule({
  declarations: [
    AppComponent,
    CurrencyComponent,
    NavbarComponent,
    SignInComponent,
    PositivePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    AngularFireAuthModule,

    FontAwesomeModule,

    AngularFireModule.initializeApp(environment.firebase),

    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
