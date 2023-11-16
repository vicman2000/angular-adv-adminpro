import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { Usuario } from 'src/app/models/usuario.model';

import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Subscription, delay } from 'rxjs';



@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [],
})
export class UsuariosComponent implements OnInit, OnDestroy {
  //#region Variables
  public totalRegistros: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];

  public imgSubs: Subscription;
  public desde: number = 0;
  public cargando: boolean = false;

  //#endregion

  constructor(
    private usuarioService: UsuarioService,
    private busquedasService: BusquedasService,
    private modalImagenService: ModalImagenService
  ) {}

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe(); // mato la subscripción para que no se genere N veces la subscripción y consuma memoria
  }

  ngOnInit(): void {
    this.cargarUsuarios();

    this.imgSubs = this.modalImagenService.nuevaImagen
        .pipe(
          delay(100)
        )
        .subscribe({
          next: () =>{
            this.cargarUsuarios();
          }
        })

  }

  cargarUsuarios() {
    this.cargando = true;

    this.usuarioService.cargaUsuarios(this.desde).subscribe({
      next: ({ total, usuarios }) => {
        this.totalRegistros = total;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;

        this.cargando = false;
      },
    });
  }

  cambiarPagina(valor: number) {
    this.desde += valor;
    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalRegistros) {
      this.desde -= valor; // regreso el desde al valor antes de haberle realizado el incremento
    }

    this.cargarUsuarios();
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return (this.usuarios = this.usuariosTemp);
    }

    return this.busquedasService
      .buscar('usuarios', termino)
      .subscribe((resultado) => {
        this.usuarios = resultado;
      });
  }

  eliminarUsuario (usuario: Usuario) {
  
    if(usuario.uid === this.usuarioService.uid){
      return Swal.fire('Error','Privilegios insuficientes para eliminarse a si mismo','error');
    };

    return Swal.fire({
      title: 'Eliminar usuario?',
      text: `Esta a punto de eliminar el usuario ${usuario.nombre}.  Esta acción no es reversible, desea continuar?`,
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      // confirmButtonColor: '#3085d6',
      // cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(usuario).subscribe((resp) => {
          this.cargarUsuarios();
          Swal.fire({
            //title: 'Eliminar!',
            text: `Usuario "${usuario.nombre}" ha sido eliminado`,
            icon: 'success',

          });
        });
      }
    });

    
  }

  cambiarRole( usuario: Usuario){
    this.usuarioService.guardarUsuario( usuario )
          .subscribe( resp =>{
            console.log('cambiarRole--> ', resp );
            
          })    
  }

  abrirModal( usuario: Usuario){
    this.modalImagenService.abrirModal('usuarios',usuario.uid, usuario.img);
  }



  /** Final de la Clase */
}
