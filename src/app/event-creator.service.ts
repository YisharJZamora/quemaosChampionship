import { Injectable } from '@angular/core';
import { EventData } from './json/eventData';
import { EventRaces } from './json/eventRaces';

@Injectable({
  providedIn: 'root'
})
export class EventCreatorService {
  private eventSettings = {
    'cathegory': '',
    'car': {},
    'specialEventCars': [],
    'track': {'id': 0, 'name': '', 'img':''},
    'time': {'hour':0, 'multiplier': 0},
    'conditions': {'rain': '', 'cloudLevel': '', 'ambientTemp': 0, 'weatherRandomness': 0}
  }
  private isGT3Event = false;

  constructor() {
    this.generateEvent();
  }

  private eventRaces = new EventRaces();
  private eventData = new EventData();

  private generateEvent(){
    this.selectTrack();
    this.selectCathegory();
    this.selectCar();
    this.selectTime();
    this.selectConditions();
  }

  private selectTrack() {
    let usedTracks: Array<any> = [];
    this.eventRaces.races.forEach(race => usedTracks.push(race.track));
    let tracksLeft = this.eventData.tracks.filter((track:any) => !usedTracks.includes(track.id));

    this.eventSettings.track = this.randomizer(tracksLeft);
  }

  private selectCathegory() {
    let numberPorscheCupDone = 0;
    this.eventRaces.races.forEach(race => {
      if(race.cathegory === 'GT3 Porsche Cup') numberPorscheCupDone += 1;
    });
    let numberMonoDone = 0;
    this.eventRaces.races.forEach(race => {
      if(race.cathegory === 'Monomarca') numberMonoDone += 1;
    });

    if(this.isSpecialEvent()) {
      this.eventSettings.cathegory = this.specialEventCathegory();
      return;
    } else {
      this.isGT3Event = this.randomIntNumber(0,3) || numberPorscheCupDone >= 3 ? true : false;
    }
    if(this.isGT3Event) {
      this.eventSettings.cathegory = this.randomIntNumber(0,3) || numberMonoDone >= 3 ? 'GT3' : 'Monomarca';
    } else {
      this.eventSettings.cathegory = 'GT3 Porsche Cup';
    }
  }

  private selectCar() {
    if(this.isSpecialEvent()) {
      this.eventSettings.specialEventCars = this.specialEventCars();
    } else {
      let selectedCarList: Array<any> = [];
      switch (this.eventSettings.cathegory) {
        case 'GT3 Porsche Cup':{
          selectedCarList = this.eventData.cars.CUP;
          this.eventSettings.car = this.randomizer(selectedCarList);
          break;
        }
        case 'GT3':{
          this.eventSettings.car = this.eventData.cars.Monomarca;
          break;
        }
        case 'Monomarca':{
          let allMonoCars = this.eventData.cars.Monomarca;
          let usedMonoCars: Array<any> = [];
          this.eventRaces.races.forEach(race => {
            if(race.cathegory === 'Monomarca'){
              usedMonoCars.push(race.result[0].carId);
            }
          });
          let monoCarsLeft = this.eventData.cars.Monomarca.filter((car:any) => !usedMonoCars.includes(car.id));
          selectedCarList = monoCarsLeft;
          this.eventSettings.car = this.randomizer(selectedCarList);
          break;
        }
      }
    }
  }

  private selectTime() {
    this.eventSettings.time.hour = this.randomIntNumber(0, 23);
    this.eventSettings.time.multiplier = this.randomIntNumber(1, 4);
  }

  private selectConditions() {
    let isNotRaining = this.randomIntNumber(0, 5);
    this.eventSettings.conditions.rain = isNotRaining ? '0' : this.randomFloatNumber();
    this.eventSettings.conditions.cloudLevel = this.randomFloatNumber();
    this.eventSettings.conditions.ambientTemp = this.randomIntNumber(15, 40);
    this.eventSettings.conditions.weatherRandomness = this.randomIntNumber(1, 5);
  }

  public isSpecialEvent() {
    return this.eventSettings.track.name === 'Misano' || this.eventSettings.track.name === 'Suzuka'
    || this.eventSettings.track.name === 'Nurburgring' || this.eventSettings.track.name === 'Brands Hatch';
  }

  private specialEventCathegory(): any {
    let eventName;
    switch (this.eventSettings.track.name) {
      case 'Misano': {
        eventName = 'Misano Italian GP'
        break;
      }
      case 'Suzuka': {
        eventName = 'Suzuka Asian GP'
        break;
      }
      case 'Nurburgring': {
        eventName = 'Nurburgring Deutschland GP'
        break;
      }
      case 'Brands Hatch': {
        eventName = 'Brands Hatch British GP'
        break;
      }
    }
    return eventName;
  }

  private specialEventCars(): any {
    let eventCars = [];
    switch (this.eventSettings.track.name) {
      case 'Misano': {
        eventCars.push(
          this.eventData.cars.Monomarca.filter(car => car.id === 7)[0],
          this.eventData.cars.Monomarca.filter(car => car.id === 9)[0],
          this.eventData.cars.Monomarca.filter(car => car.id === 10)[0]);
        break;
      }
      case 'Suzuka': {
        eventCars.push(
          this.eventData.cars.Monomarca.filter(car => car.id === 20)[0],
          this.eventData.cars.Monomarca.filter(car => car.id === 8)[0],
          this.eventData.cars.Monomarca.filter(car => car.id === 11)[0],
          this.eventData.cars.Monomarca.filter(car => car.id === 14)[0],
          this.eventData.cars.Monomarca.filter(car => car.id === 15)[0]);
        break;
      }
      case 'Nurburgring': {
        eventCars.push(
          this.eventData.cars.Monomarca.filter(car => car.id === 3)[0],
          this.eventData.cars.Monomarca.filter(car => car.id === 4)[0],
          this.eventData.cars.Monomarca.filter(car => car.id === 6)[0],
          this.eventData.cars.Monomarca.filter(car => car.id === 13)[0],
          this.eventData.cars.Monomarca.filter(car => car.id === 16)[0],
          this.eventData.cars.Monomarca.filter(car => car.id === 17)[0]);
        break;
      }
      case 'Brands Hatch': {
        eventCars.push(
          this.eventData.cars.Monomarca.filter(car => car.id === 1)[0],
          this.eventData.cars.Monomarca.filter(car => car.id === 2)[0],
          this.eventData.cars.Monomarca.filter(car => car.id === 19)[0],
          this.eventData.cars.Monomarca.filter(car => car.id === 5)[0],
          this.eventData.cars.Monomarca.filter(car => car.id === 21)[0],
          this.eventData.cars.Monomarca.filter(car => car.id === 12)[0],
          this.eventData.cars.Monomarca.filter(car => car.id === 13)[0]);
        break;
      }
    }
    return eventCars;
  }

  private randomizer (options: [...any]): any {
    let min = 1;
    let max = options.length;
    let result = Math.floor(Math.random() * (max - min + 1) + min);
    return options[result - 1];
  }

  private randomIntNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  private randomFloatNumber() {
    let randomValue = this.randomIntNumber(0, 100);
    if (randomValue == 100){
      return '1';
    } else {
      return '0.' + randomValue;
    }
  }

  public getEvent() {
    return this.eventSettings;
  }
}
