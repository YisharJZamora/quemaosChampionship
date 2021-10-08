import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventRandomizerComponent } from './event-randomizer/event-randomizer.component';
import { RankPageComponent } from './rank-page/rank-page.component';

const routes: Routes = [
  {path: 'event-randomizer', component: EventRandomizerComponent},
  {path: 'rank', component: RankPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
