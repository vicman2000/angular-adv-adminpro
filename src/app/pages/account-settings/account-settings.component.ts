import { compileNgModuleFromRender2 } from '@angular/compiler/src/render3/r3_module_compiler';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  public linkTheme = document.getElementById('theme');
  public links: NodeListOf<Element>;

  constructor() { }

  ngOnInit(): void {
    this.links = document.querySelectorAll('.selector');
    this.checkCurrentTheme();
  }

  changeTheme( theme: string ){
    const url = `./assets/css/colors/${ theme }.css`;
    this.linkTheme.setAttribute('href',url);
    localStorage.setItem('theme', url );
    this.checkCurrentTheme();
  }

  checkCurrentTheme(){
    this.links.forEach( e=> {
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
