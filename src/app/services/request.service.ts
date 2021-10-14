import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private baseUrl = 'https://quemaos-randomizaos-backend.herokuapp.com';

  constructor(private http: HttpClient) { }

  getEvent() {
    return this.http.get(`${this.baseUrl}/newEvent`)
  }
  getUnofficialEvent() {
    return this.http.get(`${this.baseUrl}/newEventUnofficial`)
  }
  launchAccessKey() {
    return this.http.get(`${this.baseUrl}/api/auth/getAccessKey`)
  }
  checkAccessKey(key:any) {
    return this.http.get(`${this.baseUrl}/api/auth/checkAccessKey/`+key)
  }
  getNextEventDate() {
    return this.http.get(`${this.baseUrl}/nextDate`)
  }
  setNextEventDate(date: any) {
    return this.http.get(`${this.baseUrl}/setNextDate/`+date)
  }
}
