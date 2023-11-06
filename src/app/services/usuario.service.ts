import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development'
import { Observable, catchError, map, of, tap } from 'rxjs'; // Utilizado para lanzar efectos secundaruios
import { Router } from '@angular/router';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';

declare const google: any;
declare const gapi: any;

const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;

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

  // google.accounts.id.initialize({
              //   callback: (response:any) => this.ngZone.run( () => this.handleCredentialResponse( response ))

  


  logout(){
    localStorage.removeItem('token');
    
    google.accounts.id.revoke('victorvicman2000@gmail.com', ()=>{
      this.router.navigateByUrl('/login');
    });
  }


  validarToken(): Observable<boolean> {

    const token = localStorage.getItem('token') || '';

    return this.http.get(`${ baseUrl }/login/renew`, {
       headers: {
          'x-token': token
       }
    }).pipe(
       tap((resp: any) => {
          localStorage.setItem('token', resp.token);
       }),
       map(resp => true),
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
