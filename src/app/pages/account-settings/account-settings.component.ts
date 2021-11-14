import { compileNgModuleFromRender2 } from '@angular/compiler/src/render3/r3_module_compiler';
import { Component, OnInit } from '@angular/core';

import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  public linkTheme = document.getElementById('theme');
  public links: NodeListOf<Element>;

  constructor( private settingService: SettingsService  ) { }

  ngOnInit(): void {
    this.settingService.checkCurrentTheme();
  }

  //============================================================

  changeTheme( theme: string ){

    this.settingService.changeTheme(theme)
    this.settingService.checkCurrentTheme();
  }

}
