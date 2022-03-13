import { Component, OnInit } from '@angular/core';

import { User as FirebaseUser } from 'firebase/auth';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-logged-in-user',
  templateUrl: './logged-in-user.component.html',
  styleUrls: ['./logged-in-user.component.scss'],
})
export class LoggedInUserComponent implements OnInit {
  constructor(public authService: AuthService) {}
  User!: FirebaseUser;
  ngOnInit() {
    this.authService.getUser().subscribe((data) => {
      this.User = data as FirebaseUser;
      console.log(this.User);
    });
  }

  logout() {
    this.authService.logout();
  }
}
