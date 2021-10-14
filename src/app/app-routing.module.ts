import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventRandomizerComponent } from './event-randomizer/event-randomizer.component';
import { RankPageComponent } from './rank-page/rank-page.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'event-randomizer', component: EventRandomizerComponent},
  {path: 'rank', component: RankPageComponent},
  {path: 'official-event', component: EventRandomizerComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
