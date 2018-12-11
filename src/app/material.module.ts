import { NgModule } from '@angular/core';
import {
	MatToolbarModule,
	MatButtonModule,
	MatIconModule,
	MatSidenavModule,
	MatFormFieldModule,
	MatSelectModule,
	MatCardModule,
	MatInputModule,
	MatRadioModule,
	MatProgressSpinnerModule,
	MatTabsModule,
	MatTableModule,
	MatPaginatorModule,
	MatDialogModule,
	MatSnackBarModule
} from '@angular/material';

@NgModule({
	imports: [
		MatToolbarModule,
		MatButtonModule,
		MatIconModule,
		MatSidenavModule,
		MatFormFieldModule,
		MatSelectModule,
		MatCardModule,
		MatInputModule,
		MatRadioModule,
		MatProgressSpinnerModule,
		MatTabsModule,
		MatTableModule,
		MatPaginatorModule,
		MatDialogModule,
		MatSnackBarModule
	],
	exports: [
		MatToolbarModule,
		MatButtonModule,
		MatIconModule,
		MatSidenavModule,
		MatFormFieldModule,
		MatSelectModule,
		MatCardModule,
		MatInputModule,
		MatRadioModule,
		MatProgressSpinnerModule,
		MatTabsModule,
		MatTableModule,
		MatPaginatorModule,
		MatDialogModule,
		MatSnackBarModule
	]
})
export class MaterialModule { }