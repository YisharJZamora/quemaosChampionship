import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventRandomizerComponent } from './event-randomizer/event-randomizer.component';
import {PanelModule} from 'primeng/panel';
import { PrimeNGConfig, SharedModule } from 'primeng/api';
import {CardModule} from 'primeng/card';
import {TableModule} from 'primeng/table';
import { RankPageComponent } from './rank-page/rank-page.component';
import { TotalRankComponent } from './total-rank/total-rank.component';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';

@NgModule({
  declarations: [
    AppComponent,
    EventRandomizerComponent,
    RankPageComponent,
    TotalRankComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PanelModule,
    CardModule,
    TableModule,
    DialogModule,
    ButtonModule
  ],
  providers: [SharedModule, PrimeNGConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
