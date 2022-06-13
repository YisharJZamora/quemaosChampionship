import { Component, OnInit } from '@angular/core';
import { EventRaces } from '../json/eventRaces';
import { RequestService } from '../services/request.service';
import { AdminService } from '../services/admin.service';
import { AttrAst } from '@angular/compiler';
import { DatePipe } from '@angular/common';

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
  isEventDate = false;
  nextEventDate = '';
  openResultsModal = false;

  constructor(
    private requestService: RequestService,
    private adminService: AdminService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    if(this.isAdminSection()){
      this.requestService.getEvent().subscribe((data:any) => {
        this.eventData = data;
        this.dataReady = true;

        this.requestService.getNextEventDate().subscribe((data:any) => {
          if(data && data.length > 0) {
            let dateString = data[0].date.replace(';', ' ');
            let date = new Date(dateString);
            let eventDate = this.datePipe.transform(date, 'dd-MM-yyyy HH:mm:ss') || '';
            if(eventDate !== ''){
              this.nextEventDate = 'Fecha del próximo evento: ' + eventDate;
              this.isEventDate = date < new Date();
            } else {
              this.nextEventDate = 'Fecha no fijada';
              this.isEventDate = false;
            }
          } else {
            this.nextEventDate = 'Fecha no fijada';
            this.isEventDate = false;
          }
        });
      });
    } else {
      this.requestService.getUnofficialEvent().subscribe((data:any) => {
        this.eventData = data;
        this.dataReady = true;
      });
    }
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
  isAdminSection(){
    return window.location.href.includes('official') && this.adminService.adminAccess;
  }
  window(): any{
    return this.window;
  }
  openSetResultsModal() {
    this.openResultsModal = true;
  }
  closeSetResultsModal() {
    this.openResultsModal =  false;
  }
}
