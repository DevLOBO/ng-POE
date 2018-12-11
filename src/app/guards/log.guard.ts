import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class LogGuard implements CanActivate {
    constructor(private router: Router) { }
    canActivate() {
        if (localStorage.getItem('uid') && localStorage.getItem('type')) {
            if (localStorage.getItem('type') == 'A') {
                this.router.navigate(['/admin']);
                return false;
            } else if (localStorage.getItem('type') == 'U') {
                this.router.navigate(['/departaments']);
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    }
}
