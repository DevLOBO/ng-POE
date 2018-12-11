import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { map, filter, first, finalize } from "rxjs/operators";

import { Departament } from "../models/departament";
import { Product } from "../models/product";
import { User } from '../models/user';
import { Ticket } from '../models/ticket';

@Injectable()
export class FirebaseService {
  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    private router: Router
  ) { }
  readDpeartamentsWithProducts() {
    const collection = this.db.collection<Departament>("departaments");
    return collection.valueChanges().pipe(
      map(departaments => {
        return departaments.map(departament => {
          const product = this.db.collection<Product>(
            `departaments/${departament.id}/products`
          );
          product.valueChanges().subscribe(dataProduct => departament.products = dataProduct);
          return departament;
        });
      })
    );
  }
  readDepartaments() {
    const collection = this.db.collection<Departament>('departaments');
    return collection.valueChanges();
  }
  addProduct(idDepartament: string, product: Product, image: File) {
    const id = this.db.createId();
    const document = this.db.doc<Product>(`departaments/${idDepartament}/products/${id}`);
    product.id = id;

    const promise = new Promise<Product>((resolve, reject) => {
      if (image) {
        const path = `images/${idDepartament}/${id}/${image.name}`;
        const ref = this.storage.ref(path);
        const task = this.storage.upload(path, image);
        task.snapshotChanges().pipe(
          finalize(() => {
            ref.getDownloadURL().subscribe((data: string) => {
              product.image = data;
              product.nameImage = image.name;
              resolve(product);
            });
          })).subscribe();
      } else {
        product.nameImage = 'noImage.png';
        product.image = 'https://firebasestorage.googleapis.com/v0/b/prueba-e92ee.appspot.com/o/electron.png?alt=media&token=32b43d9e-19f1-4f94-9b07-f360040434c8';
        resolve(product);
      }
    });
    return promise.then(result => {
      return document.set(result);
    });
  }
  readProduts(id: string) {
    const collection = this.db.doc(`/departaments/${id}`).collection<Product>('products');
    return collection.valueChanges();
  }
  readProduct(departament: string, id: string) {
    const document = this.db.doc<Product>(`departaments/${departament}/products/${id}`);
    return document.valueChanges();
  }
  deleteProduct(idDepartamento: string, idProducto: string) {
    const document = this.db.doc<Product>(`departaments/${idDepartamento}/products/${idProducto}`);
    return document.delete();
  }
  updateProduct(idDepartamento: string, product: Product) {
    const document = this.db.doc<Product>(`departaments/${idDepartamento}/products/${product.id}`);
    return document.update(product);
  }

  addUser(user: User) {
    const id = this.db.createId();
    const document = this.db.doc<User>(`users/${id}`);
    user.id = id;
    return document.set(user);
  }
  readUsers() {
    const collection = this.db.collection<User>('users');
    return collection.valueChanges();
  }
  deleteUser(id: string) {
    const document = this.db.doc<User>(`users/${id}`);
    return document.delete();
  }
  updateUser(user: User) {
    const document = this.db.doc<User>(`users/${user.id}`);
    return document.update(user);
  }

  saveTicket(departament: number, product: Product, dateBuy: Date) {
    const idTicket = this.db.createId();
    const uid = localStorage.getItem('uid');
    const document = this.db.doc<Ticket>(`users/${uid}/tickets/${idTicket}`);
    const ticket: Ticket = {
      id: idTicket,
      idDepartament: departament,
      idProduct: product.id,
      date: dateBuy
    };
    return document.set(ticket);
  }

  loginUser(user: User) {
    const collection = this.db.collection<User>('users');
    return collection.valueChanges().pipe(
      map((users: User[]) => {
        return users.filter(us => (us.username == user.username && us.password == user.password && us.type && user.type))[0];
      })
    );
  }
  signUpUser(user: User) {
    const id = this.db.createId();
    user.id = id;
    user.type = 'U';
    localStorage.setItem('uid', id);
    localStorage.setItem('type', user.type);
    localStorage.setItem('name', user.username);
    const document = this.db.doc<User>(`users/${id}`);
    return document.set(user);
  }
}