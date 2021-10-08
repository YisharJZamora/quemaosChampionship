import { Component, OnInit } from '@angular/core';
import { EventCreatorService } from '../event-creator.service';
import { EventClassificationService } from '../event-classification.service';
import { EventRaces } from '../json/eventRaces';

@Component({
  selector: 'app-event-randomizer',
  templateUrl: './event-randomizer.component.html',
  styleUrls: ['./event-randomizer.component.css']
})
export class EventRandomizerComponent implements OnInit {

  eventData: any;
  eventRaces = new EventRaces();
  rowConditions = [1];

  constructor(
    private eventCreator: EventCreatorService,
    private eventClassification: EventClassificationService
  ) { }

  ngOnInit(): void {
    this.eventData = this.eventCreator.getEvent();
  }

  isSpecialEvent() {
    return this.eventCreator.isSpecialEvent();
  }

  getHourFormatted() {
    let baseHour = this.eventData.time.hour + '';
    baseHour = baseHour.length < 2 ? '0' + baseHour : baseHour;
    baseHour = baseHour + ':00';
    return baseHour;
  }

  printPDF(){
    window.print();
  }

  getDate() {
    return (new Date()).toString().split('GMT')[0] + '(Islas Canarias)';
  }

  getCurrentNumEvent() {
    return this.eventRaces.races.length + 1;
  }
}
