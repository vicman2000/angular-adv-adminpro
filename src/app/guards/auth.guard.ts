import { CanActivateFn, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { inject } from '@angular/core';
import { tap } from 'rxjs';


export const AuthGuard: CanActivateFn = (route, state) => {

  const usuarioService = inject(UsuarioService);
  const router = inject( Router );

  // console.log( 'Paso por el canActivate del Guard');

  return usuarioService.validarToken().pipe(
    tap((isAuthenticated) => {
      if (!isAuthenticated) {
        router.navigateByUrl('/login');
      }
    })
  );

  // return usuarioService.validarToken()
  // .pipe(
  //   tap( (resp: any) => {
  //     localStorage.setItem('token', resp.token );            
  //   })
  // );
  

  // return true;



};
