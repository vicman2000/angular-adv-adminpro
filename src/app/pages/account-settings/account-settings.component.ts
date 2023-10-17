import { Element } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [],
})
export class AccountSettingsComponent {
 
    /**
   * LLama servicio de settings
   */
  constructor( private settingsService: SettingsService) {  }

  ngOnInit(): void {
    this.settingsService.checkCurrentTheme();  
  }
  
  // Funcion para cambiar y almacenar el tema seleccionado
  changeTheme(theme: string) {
    this.settingsService.changeTheme( theme );
  }

  



}
