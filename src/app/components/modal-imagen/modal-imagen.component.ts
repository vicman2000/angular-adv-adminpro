import { Component } from '@angular/core';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent {

  public ocultarModal: boolean = false;

  constructor() {  }


cerrarModal(){
  console.log('clic en cerrarModal');
  
  this.ocultarModal = true;
}


}
