
import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  public usuario: Usuario;
  menuItems: any[];

  constructor( public sidebarService: SidebarService,
              private usuarioService: UsuarioService ) {

      //this.menuItems = this.sidebarService.menu;   
      this.usuario = usuarioService.usuario;
  }


}
