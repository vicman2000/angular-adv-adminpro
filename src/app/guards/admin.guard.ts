import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

import { UsuarioService } from '../services/usuario.service';

export const adminGuard: CanActivateFn = (route, state) => {

  const usuarioService = inject(UsuarioService);
  //const router = inject(Router);

  if( usuarioService.role === 'ADMIN_ROLE'){
    return true;
  } else {
    //return router.navigateByUrl('/login');
    usuarioService.logout();
    return false;
  }

 
};
