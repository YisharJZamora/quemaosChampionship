import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.css']
})
export class AppMenuComponent implements OnInit {


  items: MenuItem[];
  activeItem: MenuItem;

  constructor() {
    this.items = [
        {label: 'Quemaos Randomizaos', icon: 'pi pi-fw pi-home', routerLink: '/'},
        {label: 'Clasificación', icon: 'pi pi-fw pi-list', routerLink: '/rank'},
        {label: 'Generar Evento', icon: 'pi pi-fw pi-pencil', routerLink: '/event-randomizer'}
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

}
