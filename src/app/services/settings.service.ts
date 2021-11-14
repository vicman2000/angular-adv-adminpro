import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTheme = document.getElementById('theme');

  constructor(    ) 
    { 

      // Valida si theme de local storage trae valor, en caso contrario le asigna uno que predeterminemos
      // Esto para inicializar el thema que escogio el usuarios como tema predeterminado
      const URL = localStorage.getItem('theme') || './assets/css/colors/default.css' ;      
      
      //Mooodifica los atributos del objeto obtenido del DOM
      this.linkTheme.setAttribute('href',URL);
      
    }


  changeTheme( theme: string ){
    const url = `./assets/css/colors/${ theme }.css`;
    this.linkTheme.setAttribute('href',url);
    localStorage.setItem('theme', url );
    this.checkCurrentTheme();
  }

  checkCurrentTheme(){
    const links = document.querySelectorAll('.selector');
    
    links.forEach( e=> {

      e.classList.remove('working');
      const btnTheme =  e.getAttribute('data-theme');
      const btnThemeUrl =  `./assets/css/colors/${ btnTheme }.css`;
      const currentTheme = this.linkTheme.getAttribute('href');
      if (btnThemeUrl === currentTheme) {
          e.classList.add('working');
      }
    })
  }


}
