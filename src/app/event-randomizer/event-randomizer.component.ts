import { Component, OnInit } from '@angular/core';
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
  dataReady = false;

  constructor(
    private requestService: RequestService
  ) {}

  ngOnInit(): void {
    this.requestService.getUnofficialEvent().subscribe((data:any) => {
      console.log(data)
      this.eventData = data;
      this.dataReady = true;
    });
  }

  isSpecialEvent() {
    return (this.eventData.track.id == 15 || this.eventData.track.id == 55 || this.eventData.track.id == 85 || this.eventData.track.id == 125);
  }

  printPDF(){
    window.print();
  }

  getDate() {
    return (new Date()).toString().split('GMT')[0] + '(Islas Canarias)';
  }
}
