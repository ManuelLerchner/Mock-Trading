import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logged-in-user',
  templateUrl: './logged-in-user.component.html',
  styleUrls: ['./logged-in-user.component.scss'],
})
export class LoggedInUserComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit() {}
}
