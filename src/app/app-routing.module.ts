import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaderboardPageComponent } from './pages/leaderboard-page/leaderboard-page.component';
import { TradePageComponent } from './pages/trade-page/trade-page.component';

const routes: Routes = [
  { path: '', component: TradePageComponent },
  { path: 'leaderboard', component: LeaderboardPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
