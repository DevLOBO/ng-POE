import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styles: []
})
export class EditProductComponent {
  updatedProduct: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.updatedProduct = this.fb.group({
      id: [this.data.id],
      name: [this.data.name, Validators.required],
      by: [this.data.by, Validators.required],
      description: [this.data.description, Validators.required],
      price: [this.data.price, Validators.required],
      stock: [this.data.stock, Validators.required],
      demoUrl: [this.data.demoUrl, [Validators.required, Validators.pattern(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/)]]
    });
  }
  get name() { return this.updatedProduct.get('name'); }
  get by() { return this.updatedProduct.get('by'); }
  get description() { return this.updatedProduct.get('description'); }
  get price() { return this.updatedProduct.get('price'); }
  get stock() { return this.updatedProduct.get('stock'); }
  get demoUrl() { return this.updatedProduct.get('demoUrl'); }
}
