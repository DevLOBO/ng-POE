import { Component, ViewChild } from '@angular/core';
import {
  MatSnackBar,
  MatDialog,
  MatPaginator,
  MatSort,
  MatTableDataSource
} from '@angular/material';
import { DeleteComponent } from '../../shared/delete/delete.component';
import { EditUserComponent } from '../../shared/edit-user/edit-user.component';

import { FirebaseService } from '../../../services/firebase.service';

import { User } from '../../../models/user';


@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html'
})
export class ViewUsersComponent {
  loading: boolean;
  dataSource: MatTableDataSource<User>;
  COLUMNS: string[] = ['id', 'username', 'password', 'type', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort; 

  constructor(
    private firebase: FirebaseService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) {
    this.loading = true;
    setTimeout(() => {
      this.firebase.readUsers().subscribe(users => {
        this.dataSource = new MatTableDataSource(users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = false;
      });
    }, 1000);
  }
  filtering(term: string) {
    this.dataSource.filter = term.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deleteUser(id: string, username: string) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '300px',
      data: {element: username}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.firebase.deleteUser(id)
        .then(() => this.snackBar.open('Usuario eliminado', 'Cerrar', {duration: 3000}))
        .catch(() => this.snackBar.open('Hubo un error', 'Cerrar', {duration: 2000}));
      }
    });
  }
  editUser(user: User) {
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '350px',
      data: { username: user.username, type: user.type }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        user.username = result.username;
        user.type = result.type;
        this.firebase.updateUser(user)
        .then(() => this.snackBar.open('Usuario modificado', 'Cerrar', {duration: 3000}))
        .catch(() => this.snackBar.open('Hubo un problema', 'Cerrrar', {duration: 2000}));
      }
    });
  }
}