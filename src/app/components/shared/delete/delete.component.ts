import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styles: []
})
export class DeleteComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
}
