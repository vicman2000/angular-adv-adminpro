import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }


  async actualizarFoto(
    archivo: File,
    tipo: 'usuarios'|'medicos'|'hospitales',
    id: string
  ){
    
    try {
      const url = `${ baseUrl }/upload/${ tipo }/${ id }`;
      const formData = new FormData();
      formData.append('imagen',archivo);
      
      // Disparo consulta al API
      const resp = await fetch( url,{
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });

      const data = await resp.json();

      if( data.ok ){
        return data.archivo
      }
      else{
        return false;
      }


    } catch (error) {
      console.log( error );
      return false;      
    }

  }


}
