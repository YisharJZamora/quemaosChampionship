import { Injectable } from '@angular/core';
import { EventRaces } from './json/eventRaces';
import { EventData } from './json/eventData';

@Injectable({
  providedIn: 'root'
})
export class EventClassificationService {

  constructor() {
    this.buildRank();
  }
  private eventRaces = new EventRaces();
  private eventData = new EventData();
  private classificationRank: Array<any> = [];

  public getRank() {
    return this.classificationRank;
  }

  buildRank() {
    this.eventRaces.drivers.forEach(driver => {
      let driverRank = {
        'driver': {},
        'totalPoints': 0,
        'racePoints': []
      };
      driverRank.driver = driver;
      this.classificationRank.push(driverRank);
    });

    this.classificationRank.forEach(driverRank => {
      this.eventRaces.races.forEach(race => {
        let racePosition = race.result.indexOf(race.result.filter(raceResult => raceResult.driverId == driverRank.driver.id)[0]);
        if (racePosition >= 0) {
          driverRank.racePoints.push(this.eventRaces.points[racePosition]);
        } else {
          driverRank.racePoints.push(0);
        }
      });
    });

    this.classificationRank.forEach(driverRank => {
      driverRank.racePoints.forEach((racePoint:number) => {
        driverRank.totalPoints += racePoint;
      });
    });

    this.classificationRank.sort((a, b) => b.totalPoints - a.totalPoints);
  }

  public getRaceRankByNumEvent(numEvent: number) {
    let race = this.eventRaces.races.filter(race => race.numEvent == numEvent)[0];
    let track = this.eventData.tracks.filter(track => track.id == race.track)[0];
    let results: Array<any> = [];

    race.result.forEach((driverInfo, index) => {
      let result = {
        'driverName': this.eventRaces.drivers.filter(driver => driver.id == driverInfo.driverId)[0].name,
        'car': this.eventData.getAllCars().filter((car:any) => car.id == race.result.filter(raceResult => raceResult.driverId == driverInfo.driverId)[0].carId)[0],
        'points': this.eventRaces.points[index]
      };
      results.push(result);
    });

    let raceRank = {
      'numEvent': numEvent,
      'track': track,
      'cathegory': race.cathegory,
      'settings': race.settings,
      'results': results
    }
    return raceRank;
  }
}
