import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { EventClassificationService } from '../event-classification.service';
import { EventRaces } from '../json/eventRaces';

@Component({
  selector: 'app-total-rank',
  templateUrl: './total-rank.component.html',
  styleUrls: ['./total-rank.component.css']
})
export class TotalRankComponent implements OnInit {

  driverRank;
  eventResults;
  selectedRaceRank: any;
  displayRaceRank = false;
  displayRaceSetting = false;
  constructor(
    private eventClassification: EventClassificationService,
    private sanitizer: DomSanitizer
  ) {
    this.eventResults = (new EventRaces()).races;
    this.driverRank = eventClassification.getRank();
  }


  ngOnInit(): void {
  }

  showRaceRankModal(numEvent: number) {
    this.selectedRaceRank = this.eventClassification.getRaceRankByNumEvent(numEvent);
    console.log(this.selectedRaceRank);

    this.displayRaceRank = true;
  }
  showRaceSettings() {
    this.displayRaceSetting = true;
  }
  getSettingsPath() {
    let path = '../../assets/'+ this.selectedRaceRank.settings;
    let securePath = 'https://github.com/YisharJZamora/quemaosChampionship/raw/develop/src/assets/racesSettings/QuemaosChampionship.pdf'
    console.log(securePath);

    return securePath;
  }

}
