import { Component } from '@angular/core';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [],
})
export class ModalImagenComponent {

  public imagenSubir: File;
  public imagenTemp: any = null;

  constructor(public modalImagenService: ModalImagenService,
              private fileUploadService: FileUploadService
    ) {}

  cerrarModal() {
    this.imagenTemp = null;
    this.modalImagenService.cerrarModal();
  }

  /** CAMBIAR IMAGEN */
  cambiarImagen(file: File) {
    this.imagenSubir = file;

    if (!file) {
      this.imagenTemp = null;
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imagenTemp = reader.result;
    };
  }


  /** SUBIR IMAGEN A REPOSITORIO */
  subirImagen() {
    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    this.fileUploadService
      .actualizarFoto(this.imagenSubir, tipo , id)
      .then((img) => {
        Swal.fire(tipo.toUpperCase(), 'Foto actualizada', 'success');

        this.modalImagenService.nuevaImagen.emit( img ); //disparo imagen al observable para actualizar el Objeto Grid

        this.cerrarModal();
      }).catch( err=> {
        console.log( err );
        Swal.fire(tipo.toUpperCase(), 'No se pudo actualizar la imagen', 'error');
      });
  }



  /** FIN DE LA CLASE */
}
