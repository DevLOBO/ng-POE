import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';


import { FirebaseService } from '../../services/firebase.service';

import { Product } from '../../models/product';

import { BuyComponent } from '../shared/buy/buy.component';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})
export class ProductComponent {
  product: Product;
  departament: number;
  loading: boolean;

  constructor(
    private firebase: FirebaseService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.loading = true;
    setTimeout(() => {
      this.activatedRoute.params.subscribe(params => {
        this.departament = +params['departament'];
        this.firebase.readProduct(params['departament'], params['id']).subscribe(data => this.product = data);
      });
      this.loading = false;
    }, 1000);
  }
  back() {
    this.router.navigate(['/departaments']);
  }
  buy() {
    const dateNow = new Date();
    const dialogRef = this.dialog.open(BuyComponent, {
      width: '400px',
      data: { product: this.product.name, date: dateNow }
    });
    this.firebase.saveTicket(this.departament, this.product, dateNow);
  }
}
