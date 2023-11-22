import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Medico } from '../models/medico.model';
import { Hospital } from '../models/hospital.model';

const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

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
cargaMedicos() {
  const url = `${ baseUrl }/medicos`;
  return this.http.get( url, this.headers )
        .pipe(
          map( (resp: {ok: boolean, medicos: Medico[]}) => resp.medicos )
        );

}

obtenerMedicoById( id: string ){
  const url = `${ baseUrl }/medicos/${ id }`;
  return this.http.get( url, this.headers )
        .pipe(
          map( (resp: {ok: boolean, medico: Medico}) => resp.medico )
        );

}


crearMedico( medico: { nombre: string, hospital: string  } ) {
  const url = `${ baseUrl }/medicos`;
  return this.http.post( url, medico , this.headers );

}


actualizarMedico( medico: Medico ) {    
  const url = `${ baseUrl }/medicos/${ medico._id }`;
  return this.http.put( url, medico, this.headers );
}

borrarMedico( _id: string ) {
  const url = `${ baseUrl }/medicos/${ _id }`;
  return this.http.delete( url, this.headers );
}


obtieneNoImage()  {
  return `${ baseUrl }/upload/hospitales/no-image.jpg`;  
}



/** Fin de la clase */
}
