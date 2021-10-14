import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AdminService } from './admin.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(public adminService: AdminService, public router: Router) {}
  canActivate(): boolean {
    if (!this.adminService.adminAccess) {
      this.router.navigate(['event-randomizer']);
      return false;
    }
    return true;
  }
}
