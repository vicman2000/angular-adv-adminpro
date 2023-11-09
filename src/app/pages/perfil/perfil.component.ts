import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';




@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup;
  public usuario: Usuario;

  constructor( private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private router: Router){

                this.usuario = usuarioService.usuario;
              }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email ]]
    })
  }
  


  actualizarPerfil(){
    
  // console.log( this.perfilForm.value );
  // this.usuarioService.actualizarPerfil(this.perfilForm.value).subscribe({
  //         next: (resp) => {
  //           console.log('');            
  //         }
  //        })
   
  // this.usuarioService.actualizarPerfil(this.perfilForm.value)
  //     .subscribe( () => {
  //           //console.log( resp );
  //           const data = this.perfilForm.value;
  //           this.usuario.nombre   = data.nombre;         
  //           this.usuario.email   =  data.email;      
  //           Swal.fire('Perfil', 'Perfil actualizado', 'success');   
  //       }
  //     )

      this.usuarioService.actualizarPerfil(this.perfilForm.value)
        .subscribe({
          next: () => {
            //console.log( resp );
            const data = this.perfilForm.value;
            this.usuario.nombre   = data.nombre;         
            this.usuario.email   =  data.email;      
            Swal.fire('Perfil', 'Perfil actualizado', 'success');   
            this.router.navigateByUrl('/');
          },
          error: err =>{
            Swal.fire('Perfil', err.error.msg , 'error');
          }
        })

    



  }


}
