import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '../../../../../node_modules/@angular/material';

@Component({
    selector: 'app-buy',
    templateUrl: './buy.component.html',
    styles: []
})
export class BuyComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }
}
