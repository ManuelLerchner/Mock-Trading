import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-leaderboard-item',
  templateUrl: './leaderboard-item.component.html',
  styleUrls: ['./leaderboard-item.component.scss'],
})
export class LeaderboardItemComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit(): void {}
}
