import { Component, OnInit } from '@angular/core';
import { EventCreatorService } from '../event-creator.service';
import { EventClassificationService } from '../event-classification.service';
import { EventRaces } from '../json/eventRaces';
import { RequestService } from '../services/request.service';

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
    private eventClassification: EventClassificationService,
    private requestService: RequestService
  ) {}

  ngOnInit(): void {
    this.eventData = this.eventCreator.getEvent();
    this.requestService.getAllCars().subscribe((data) => {
      console.log(data);
    });
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

  getGT3Cars() {
    return this.eventData.car;
  }
}
