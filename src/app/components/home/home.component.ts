import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  title = 'Proyecto: Punto de Ventas';
  content = 'Proyecto reaalizado con el framework Electron, para su construcción en plataforma de escritorio; Angular 6 como Front-end de ambiente web y Firebase como Back-end.';
  
  constructor() { }

  ngOnInit() {
  }
}