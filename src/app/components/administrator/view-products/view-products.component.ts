import { Component, ViewChild } from '@angular/core';
import {
  MatPaginator,
  MatSort,
  MatTableDataSource,
  MatSnackBar,
  MatDialog
} from '@angular/material';


import { DeleteComponent } from '../../shared/delete/delete.component';
import { EditProductComponent } from '../../shared/edit-product/edit-product.component';

import { FirebaseService } from '../../../services/firebase.service';

import { Departament } from '../../../models/departament';
import { Product } from '../../../models/product';


@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html'
})
export class ViewProductsComponent {
  departaments: Departament[];
  selected: string;
  loading: boolean;

  dataSource: MatTableDataSource<Product>;
  COLUMNS = ['id', 'name', 'by', 'price', 'stock', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private firebase: FirebaseService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.loading = true;
    setTimeout(() => {
      this.firebase.readDepartaments().subscribe(data => this.departaments = data);
      this.loading = false;
    }, 500);
  }
  filtering(term: string) {
    this.dataSource.filter = term.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  loadProducts() {
    this.loading = true;
    this.firebase.readProduts(this.selected).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    });
  }
  deleteProduct(id: string, name: string) {
    
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '300px',
      data: {element: name}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.firebase.deleteProduct(this.selected, id)
        .then(() => this.snackBar.open('Producto eliminado', 'Cerrar', {duration: 3000}))
        .catch(() => this.snackBar.open('Hubo un error', 'Cerrar', {duration: 2000}));
      }
    });
  }
  editProduct(product: Product) {
    const dialogRef = this.dialog.open(EditProductComponent, {
      width: '500px',
      data: product
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.firebase.updateProduct(this.selected, result)
        .then(() => this.snackBar.open('Usuario modificado', 'Cerrar', {duration: 3000}))
        .catch(() => this.snackBar.open('Hubo un problema', 'Cerrrar', {duration: 2000}));
      }
    });
  
  }
}