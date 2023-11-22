import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { map } from 'rxjs';
import { Hospital } from '../models/hospital.model';

const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor( 
    private http: HttpClient
  ) { }


  get token(): string {
    return localStorage.getItem('token') || '';
  }

  
  get headers(){
    return {
      headers: {
        'x-token': this.token,
      }
    }
  }
  

  //#region MANTENIMIENTOS
  cargaHospitales() {
    const url = `${ baseUrl }/hospitales`;
    return this.http.get( url, this.headers )
          .pipe(
            map( (resp: {ok: boolean, hospitales: Hospital[]}) => resp.hospitales )
          );

  }

  crearHospital( nombre: string ) {
    const url = `${ baseUrl }/hospitales`;
    return this.http.post( url, { nombre }, this.headers );

  }

  actualizarHospital( _id: string, nombre: string ) {    
    const url = `${ baseUrl }/hospitales/${ _id }`;
    return this.http.put( url, { nombre }, this.headers );
  }

  borrarHospital( _id: string ) {
    const url = `${ baseUrl }/hospitales/${ _id }`;
    return this.http.delete( url, this.headers );
  }


}
