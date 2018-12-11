import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { MatSnackBar } from '@angular/material';


import { FirebaseService } from '../../../services/firebase.service';

import { Departament } from '../../../models/departament';


@Component({
  selector: 'app-insert-product',
  templateUrl: './insert-product.component.html'
})
export class InsertProductComponent {
  newProduct: FormGroup;
  departaments: Departament[];
  selected: string;
  loading: boolean;
  file: File;

  constructor(
    private firebase: FirebaseService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.loading = false;
    setTimeout(() => {
      this.firebase.readDepartaments().subscribe(data => this.departaments = data);
    }, 100);
    this.newProduct = this.fb.group({
      name: ['', Validators.required],
      by: ['', Validators.required],
      description: ['', Validators.required],
      departament: ['', Validators.required],
      price: [, Validators.required],
      stock: [, Validators.required],
      demoUrl: ['', [Validators.required, Validators.pattern(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\?\w= \.-]*)*\/?$/)]],
      image: ['']
    });
  }
  setImage(img: File) { this.file = img; }
  addProduct() {
    this.loading = true;
    const idDepartament = this.newProduct.value.departament;
    const product = this.newProduct.value;
    delete product.departament;
    delete product.image;
    this.firebase.addProduct(idDepartament, product, this.file)
    .then(() => {
      this.loading = false;
      this.newProduct.reset();
      this.snackBar.open('Producto agregado', 'Cerrar', {duration: 2000});
    })
    .catch(() => {
      this.loading = false;
      this.snackBar.open('Hubo un error', 'Cerrar', {duration: 3000});
    });
  }
  get name() { return this.newProduct.get('name'); }
  get by() { return this.newProduct.get('by'); }
  get description() { return this.newProduct.get('description'); }
  get departament() { return this.newProduct.get('departament'); }
  get price() { return this.newProduct.get('price'); }
  get stock() { return this.newProduct.get('stock'); }
  get demoUrl() { return this.newProduct.get('demoUrl'); }
  get image() { return this.newProduct.get('image'); }
}