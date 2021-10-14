import { Component, OnInit } from '@angular/core';
import { RequestService } from '../services/request.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private requestService: RequestService,
    private datePipe: DatePipe) { }

  nextEventDate = '';
  nextEventHour = '';
  ngOnInit(): void {
    this.requestService.getNextEventDate().subscribe((data:any) => {
      if(data && data.length > 0) {
        let dateString = data[0].date.replace(';', ' ');
        let date = new Date(dateString);
        let eventDate = this.datePipe.transform(date, 'dd-MM-yyyy HH:mm:ss') || '';
        if(eventDate !== ''){
          this.nextEventDate = eventDate.split(' ')[0];
          this.nextEventHour = eventDate.split(' ')[1];
        } else {
          this.nextEventDate = 'Fecha no fijada';
          this.nextEventHour = 'Hora no fijada';
        }
      } else {
        this.nextEventDate = 'Fecha no fijada';
        this.nextEventHour = 'Hora no fijada';
      }
    })
  }
}
