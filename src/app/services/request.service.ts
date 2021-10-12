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

  getAllCars() {
    return this.http.get(`${this.baseUrl}/api/cars/allCars`)
  }
}
