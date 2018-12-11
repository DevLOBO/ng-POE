import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private router: Router) { }
    canActivate() {
        if (!localStorage.getItem('uid') || !localStorage.getItem('type')) {
            this.router.navigate(['/']);
            return false;
        } else {
            if (localStorage.getItem('type') == 'A') {
                return true;
            } else {
                this.router.navigate(['/']);
                return false;
            }
        }
    }
}
