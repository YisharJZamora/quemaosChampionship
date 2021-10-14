import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AdminService } from '../services/admin.service';
import { RequestService } from '../services/request.service';

@Component({
  selector: 'app-app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.css']
})
export class AppMenuComponent implements OnInit {


  items: MenuItem[];
  activeItem: MenuItem;
  accessKey = '';
  nextDate = '';
  openNextEventModal = false;

  constructor(private adminService: AdminService,
              private requestService: RequestService,
              private router: Router) {
    this.items = [
        {label: 'Inicio', icon: 'pi pi-fw pi-home', routerLink: '/'},
        {label: 'Clasificación', icon: 'pi pi-fw pi-list', routerLink: '/rank'},
        {label: 'Generador', icon: 'pi pi-fw pi-pencil', routerLink: '/event-randomizer'}
    ];
    this.activeItem = this.items[0];
    this.selectMenuItemActive();
  }

  ngOnInit() {
  }

  selectMenuItemActive() {
    if(window.location.href.includes('/rank')) {
      this.activeItem = this.items[1];
      return;
    }
    if(window.location.href.includes('/event-randomizer')) {
      this.activeItem = this.items[2];
      return;
    }
  }

  enableAdminAccess() {
    return this.adminService.enabledAdminAccess;
  }
  adminVerified() {
    return this.adminService.adminAccess;
  }
  sendKey() {
    this.requestService.launchAccessKey().subscribe((data:any) => {});
  }
  tryAdminAccess() {
    this.adminService.enabledAdminAccess = false;
    this.requestService.checkAccessKey(this.accessKey).subscribe((data:any) => this.adminService.adminAccess = data.verifiedAccess);
  }
  goToAdminEvent() {
    this.router.navigateByUrl('/official-event');
  }
  needNextEventDateModal() {
    return this.openNextEventModal;
  }
  openNextEventDateModal() {
    this.openNextEventModal = true;
  }
  setNextEventDate() {
    this.openNextEventModal = false;
    this.requestService.setNextEventDate(this.nextDate.replace(' ', ';')).subscribe((data:any) => {
      console.log(data)
    })
  }
  closeModals() {
    this.openNextEventModal = false;
    this.adminService.enabledAdminAccess = false;
  }
}
