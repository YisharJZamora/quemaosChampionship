import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private backDoor = 0;
  public enabledAdminAccess = false;
  public adminAccess = false;

  constructor() {
    document.addEventListener('keydown', this.checkBackDoorAccess.bind(this))
  }

  checkBackDoorAccess(event: any){
   if(this.backDoor == 0 && event.code === 'Tab') {
    this.backDoor++;
   } else if (this.backDoor == 1 && event.code === 'ShiftRight') {
    this.backDoor++;
   } else if (this.backDoor == 2 && event.code === 'Backspace') {
    this.backDoor++;
   } else if (this.backDoor == 3 && event.code === 'ShiftLeft') {
    this.enabledAdminAccess = true;
    this.backDoor = 0;
   } else {
     this.backDoor = 0;
   }
  }

}
