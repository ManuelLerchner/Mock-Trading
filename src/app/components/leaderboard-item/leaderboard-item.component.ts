import { Component, Input, OnInit } from '@angular/core';
import { Profile } from 'src/app/models/Profile';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-leaderboard-item',
  templateUrl: './leaderboard-item.component.html',
  styleUrls: ['./leaderboard-item.component.scss'],
})
export class LeaderboardItemComponent implements OnInit {
  @Input() profile!: Profile;
  constructor(public authService: AuthService) {}

  ngOnInit(): void {}
}
