import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development'
import { Observable, catchError, map, of, tap } from 'rxjs'; // Utilizado para lanzar efectos secundaruios
import { Router } from '@angular/router';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { Usuario } from '../models/usuario.model';
import { valueOrDefault } from 'chart.js/dist/helpers/helpers.core';

declare const google: any;
declare const gapi: any;

const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario: Usuario;

  constructor( private http: HttpClient,
              private router: Router) { }

  googleInit(){
    gapi.load('auth2', ()=>{
      this.auth2 = gapi.auth2.init({
        client_id: "179552952214-d9c1akugj4fqvakri9538cob1rimcc7n.apps.googleusercontent.com",
        cookiepolicy: 'single_host_origin'
      })
    })
  }



  logout(){
    localStorage.removeItem('token');    
    //console.log('Vicman::: ', this.usuario );
    if( this.usuario.img.includes('https') )
    {
      google.accounts.id.revoke(this.usuario.email, ()=>{
        this.router.navigateByUrl('/login');
      });
    } else{
      this.router.navigateByUrl('/login');
    }
  }


  validarToken(): Observable<boolean> {

    const token = localStorage.getItem('token') || '';

    return this.http.get(`${ baseUrl }/login/renew`, {
       headers: {
          'x-token': token
       }
    }).pipe(
       map((resp: any) => {
        
          const {nombre, email, img='', google, role, uid } = resp.usuario;
          this.usuario = new Usuario(nombre, email,'', img, google, role, uid);
          localStorage.setItem('token', resp.token);
          return true;          
       }),
       catchError(error => of(false))
    );
 }

  //Utilizamos interface 
  crearUsuario( formData: RegisterForm ){
    
    return this.http.post( `${ baseUrl }/usuarios`, formData)
              .pipe(
                tap( (resp: any) => {
                  localStorage.setItem('token', resp.token );            
                })
              );
              
  }

  login( formData: LoginForm ){
    return this.http.post(`${ baseUrl }/login`, formData)
              .pipe(
                tap( (resp: any) => {
                  localStorage.setItem('token', resp.token );          
                })
              );
  }


  loginGoogle( token: string ) {
    return this.http.post( `${ baseUrl }/login/google`,{ token })
              .pipe(
                tap( (resp: any) =>{
                  localStorage.setItem('token', resp.token )
                })
              )
  }


}
