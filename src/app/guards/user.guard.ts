import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class UserGuard implements CanActivate {
    constructor(private router: Router) { }
    canActivate() {
        if (!localStorage.getItem('uid') || !localStorage.getItem('type')) {
            this.router.navigate(['/']);
        } else {
            if (localStorage.getItem('type') == 'U') {
                return true;
            } else {
                this.router.navigate(['/']);
                return false;
            }
        }
    }
}
