import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { Usuario } from 'src/app/models/usuario.model';

import { UsuarioService } from 'src/app/services/usuario.service';
import { FileUploadService } from '../../services/file-upload.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [],
})
export class PerfilComponent implements OnInit {
  public perfilForm: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public imagenTemp: any = null;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private fileUploadService: FileUploadService
  ) {
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]],
    });
  }

  /** ACTUALIZAR PERFIL */
  actualizarPerfil() {
    this.usuarioService.actualizarPerfil(this.perfilForm.value).subscribe({
      next: () => {
        //console.log( resp );
        const data = this.perfilForm.value;
        this.usuario.nombre = data.nombre;
        this.usuario.email = data.email;

        Swal.fire('Perfil', 'Perfil actualizado', 'success');
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        Swal.fire('Perfil', err.error.msg, 'error');
      },
    });
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
    this.fileUploadService
      .actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid)
      .then((img) => {
        this.usuario.img = img;
        Swal.fire('Perfil', 'Foto actualizada', 'success');
      });
  }

  cancelaSubirImagen(){
    this.imagenTemp = null;
  }
}
