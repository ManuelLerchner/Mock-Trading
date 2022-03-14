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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { AngularFireModule } from '@angular/fire/compat';
import { registerLocaleData } from '@angular/common';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import localeUSA from '@angular/common/locales/en-US-POSIX';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { PositivePipe } from './pipes/positive.pipe';

import { AuthService } from './services/auth.service';

import { AppComponent } from './app.component';
import { CurrencyItemComponent } from './components/currency/currency-item.component';
import { CurrencyDetailComponent } from './components/currency-detail/currency-detail.component';
import { ArrowUpComponent } from './components/arrow-up/arrow-up.component';
import { ArrowDownComponent } from './components/arrow-down/arrow-down.component';
import { LoggedInUserComponent } from './components/logged-in-component/logged-in-user.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignInComponent } from './components/signin/signin.component';

registerLocaleData(localeUSA);

@NgModule({
  declarations: [
    AppComponent,
    CurrencyItemComponent,
    NavbarComponent,
    SignInComponent,
    PositivePipe,
    CurrencyDetailComponent,
    ArrowUpComponent,
    ArrowDownComponent,
    LoggedInUserComponent,
    SidenavComponent,
    PortfolioComponent,
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
    MatFormFieldModule,
    MatInputModule,
    FontAwesomeModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDividerModule,
    MatSidenavModule,
    MatListModule,

    AngularFireModule.initializeApp(environment.firebase),

    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
