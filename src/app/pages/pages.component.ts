import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';



@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  public linkTheme = document.getElementById('theme');
  

  constructor( private settingsService: SettingsService  ) {  }

  ngOnInit(): void {

    // Valida si theme de local storage trae valor, en caso contrario le asigna uno que predeterminemos
    // Esto para inicializar el thema que escogio el usuarios como tema predeterminado
    const URL = localStorage.getItem('theme') || './assets/css/colors/default.css' ;            
    this.linkTheme.setAttribute('href',URL);

  
  }

}
