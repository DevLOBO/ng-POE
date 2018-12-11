import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { DepartamentsComponent } from './components/departaments/departaments.component';
import { ProductComponent } from './components/product/product.component';
import { LoginComponent } from './components/login/login.component';

import { AdministratorComponent } from './components/administrator/administrator.component';
import { ViewProductsComponent } from './components/administrator/view-products/view-products.component';
import { InsertProductComponent } from './components/administrator/insert-product/insert-product.component';
import { ViewUsersComponent } from './components/administrator/view-users/view-users.component';
import { InsertUserComponent } from './components/administrator/insert-user/insert-user.component';

import { UserGuard } from './guards/user.guard';
import { AdminGuard } from './guards/admin.guard';
import { LogGuard } from './guards/log.guard';
import { RegisterComponent } from './components/register/register.component';

export const ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'departaments', component: DepartamentsComponent, canActivate: [UserGuard] },
    { path: 'product/:departament/:id', component: ProductComponent, canActivate: [UserGuard] },
    { path: 'login', component: LoginComponent, canActivate: [LogGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [LogGuard] },
    {
        path: 'admin',
        component: AdministratorComponent,
        canActivate: [AdminGuard],
        children: [
            { path: '', redirectTo: 'view-products', pathMatch: 'full' },
            { path: 'view-products', component: ViewProductsComponent },
            { path: 'view-users', component: ViewUsersComponent },
            { path: 'insert-product', component: InsertProductComponent},
            { path: 'insert-user', component: InsertUserComponent },
            { path: '**', redirectTo: 'view-products', pathMatch: 'full' }
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];