import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, map, of, tap } from 'rxjs'; // Utilizado para lanzar efectos secundaruios
import { Router } from '@angular/router';

import { environment } from '../../environments/environment.development';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { iCargarUsuarios } from '../interfaces/cargar-usuarios.interface';

import { Usuario } from '../models/usuario.model';

declare const google: any;
declare const gapi: any;

const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public auth2: any;
  public usuario: Usuario;

  constructor(private http: HttpClient, private router: Router) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get role(): string {  //'ADMIN_ROLE' | 'USER_ROLE' {
    return this.usuario.role;
  }

  get uid(): string {
    return this.usuario.uid || '';
  }

  get headers(){
    return {
      headers: {
        'x-token': this.token,
      }
    }
  }


  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id:
          '179552952214-d9c1akugj4fqvakri9538cob1rimcc7n.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
      });
    });
  }


  validarToken(): Observable<boolean> {
    return this.http
      .get(`${baseUrl}/login/renew`, {
        headers: {
          'x-token': this.token,
        },
      })
      .pipe(
        map((resp: any) => {
          const { nombre, email, img = '', google, role, uid } = resp.usuario;
          this.usuario = new Usuario(nombre, email, '', img, google, role, uid);

          this.almacenaVarStorage( resp.token, resp.menu );
          
          return true;
        }),
        catchError((error) => of(false))
      );
  }

  //Utilizamos interface
  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${baseUrl}/usuarios`, formData).pipe(
      tap((resp: any) => {
        
        this.almacenaVarStorage( resp.token, resp.menu );

      })
    );
  }

  actualizarPerfil(data: { email: string; nombre: string; role: string }) {
    data = {
      ...data,
      role: this.usuario.role,
    };

    return this.http.put(`${baseUrl}/usuarios/${this.uid}`, data, {
      headers: {
        'x-token': this.token,
      },
    });
  }

  login(formData: LoginForm) {
    return this.http.post(`${baseUrl}/login`, formData).pipe(
      tap((resp: any) => {

        this.almacenaVarStorage( resp.token, resp.menu );

      })
    );
  }

  loginGoogle(token: string) {
    return this.http.post(`${baseUrl}/login/google`, { token }).pipe(
      tap((resp: any) => {

        this.almacenaVarStorage( resp.token, resp.menu );

      })
    );
  }

  logout() {
    this.removeVarStorage();
    
    if (this.usuario.img.includes('https')) {
      google.accounts.id.revoke(this.usuario.email, () => {
        this.router.navigateByUrl('/login');
      });
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  almacenaVarStorage(pToken: string, pMenu: any ){
    localStorage.setItem( 'token', pToken );
    localStorage.setItem( 'menu', JSON.stringify(pMenu)  );
  }

  removeVarStorage(){
    localStorage.removeItem( 'token' );
    localStorage.removeItem( 'menu' );
  }

  //#region MANTENIMIENTOS

  cargaUsuarios(desde: number = 0) {
    const url = `${baseUrl}/usuarios?desde=${desde}`;
    return this.http.get<iCargarUsuarios>( url, this.headers )
          .pipe(
            //delay(5000), //--> Simule tiempo de espera para ver funcionalidad del cargando...
            map( resp =>{
              const usuarios = resp.usuarios.map(
                    user => new Usuario(
                      user.nombre,
                      user.email,
                      '',
                      user.img,
                      user.google,
                      user.role,
                      user.uid
                    )
              );
              
              return {
                total: resp.total,
                usuarios
              }
            })
          )

  }


  eliminarUsuario( usuario: Usuario ){
    //console.log('eliminando');
    const url = `${ baseUrl }/usuarios/${ usuario.uid }`;
    return this.http.delete( url, this.headers );
  }


  guardarUsuario( usuario: Usuario ){
    const url = `${ baseUrl }/usuarios/${ usuario.uid }`;
    return this.http.put( url, usuario, this.headers );
    
  }


  //#endregion
}
