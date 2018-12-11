import { Component } from '@angular/core';
import { Router } from '@angular/router';


import { FirebaseService } from '../../services/firebase.service';

import { Departament } from '../../models/departament';

@Component({
	selector: 'app-departaments',
	templateUrl: './departaments.component.html'
})
export class DepartamentsComponent {
	loading: boolean;
  departaments: Departament[];

  constructor(
    private firebase: FirebaseService,
    private router: Router
  ) {
    this.loading = true;
    setTimeout(() => {
      this.firebase.readDpeartamentsWithProducts().subscribe(data => this.departaments = data);
      this.loading = false;
    }, 1000);
  }
  goToProduct(idDepartament: string, idProduct: string) {
    this.router.navigate(['product', idDepartament, idProduct]);
  }
}