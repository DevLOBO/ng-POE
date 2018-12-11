import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html'
})
export class ToolbarComponent {
    typeUser = localStorage.getItem('type');
    nameUser = localStorage.getItem('name');

    constructor(
        private router: Router
    ) { }
    logout() {
        localStorage.clear();
        this.router.navigate(['/']);
    }
}
