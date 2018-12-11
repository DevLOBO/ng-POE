import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { environment } from '../environments/environment';
import { FirebaseService } from './services/firebase.service';


import { ROUTES } from './app.routes';

import { MaterialModule } from './material.module';


import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { DepartamentsComponent } from './components/departaments/departaments.component';
import { ProductComponent } from './components/product/product.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { AdministratorComponent } from './components/administrator/administrator.component';
import { InsertUserComponent } from './components/administrator/insert-user/insert-user.component';
import { InsertProductComponent } from './components/administrator/insert-product/insert-product.component';
import { ViewUsersComponent } from './components/administrator/view-users/view-users.component';
import { ViewProductsComponent } from './components/administrator/view-products/view-products.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { ToolbarComponent } from './components/shared/toolbar/toolbar.component';

import { DeleteComponent } from './components/shared/delete/delete.component';
import { EditProductComponent } from './components/shared/edit-product/edit-product.component';
import { EditUserComponent } from './components/shared/edit-user/edit-user.component';
import { BuyComponent } from './components/shared/buy/buy.component';


import { DomSecurePipe } from './pipes/dom-secure.pipe';
import { CutStringPipe } from './pipes/cut-string.pipe';

import { AdminGuard } from './guards/admin.guard';
import { UserGuard } from './guards/user.guard';
import { LogGuard } from './guards/log.guard';




@NgModule({
  entryComponents: [
    DeleteComponent,
    EditProductComponent,
    EditUserComponent,
    BuyComponent
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    DepartamentsComponent,
    ProductComponent,
    LoginComponent,
    RegisterComponent,
    AdministratorComponent,
    InsertUserComponent,
    InsertProductComponent,
    ViewUsersComponent,
    ViewProductsComponent,
    LoadingComponent,
    ToolbarComponent,
    DeleteComponent,
    EditProductComponent,
    EditUserComponent,
    BuyComponent,
    DomSecurePipe,
    CutStringPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES),
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.configFirebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireStorageModule,
    MaterialModule
  ],
  providers: [
    FirebaseService,
    AdminGuard,
    UserGuard,
    LogGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
