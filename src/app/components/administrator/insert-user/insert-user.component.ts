import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';


import { FirebaseService } from '../../../services/firebase.service';


@Component({
  selector: 'app-insert-user',
  templateUrl: './insert-user.component.html',
  styles: []
})
export class InsertUserComponent {
  newUser: FormGroup;
  loading: boolean;

  constructor(
    private fb: FormBuilder,
    private firebase: FirebaseService,
    public snackBar: MatSnackBar
  ) {
    this.loading = false;
    this.newUser = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      type: ['', Validators.required]
    });
  }
  onSubmit() {
    this.loading = true;
    this.firebase.addUser(this.newUser.value)
    .then(() => this.snackBar.open('Usuario agregado', 'Cerrar', {duration: 3000}))
    .catch(() => this.snackBar.open('Hubo un problema', 'Cerrar', {duration: 2000}));
    this.loading = false;
    this.newUser.reset();
  }
  get username() { return this.newUser.get('username'); }
  get password() { return this.newUser.get('password'); }
  get type() { return this.newUser.get('type'); }
}