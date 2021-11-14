import { PropertyRead } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    // //manejo de una promesa
    // const promesa = new Promise( ( resolve, reject ) => {

    //     if ( false ) {
    //       resolve('Hola mundo vicman!!')    
    //     } else {
    //       reject('Algo salió mal')
    //     }
    // })
  
    // // Recibir una promesa
    // // las acciones dentro de la promesa, se ejecutan una vez haya terminado el proceso que lo llamo

    // promesa.then( ( mensaje )=>{
    //   console.log( mensaje ); // recibo generado por la promesa
    // })
    // .catch( error => console.log('Error en la promesa', error )); 
    
    // // Esta acción se ejecuta antes de que termine la promesa , es decir, se ejecuitan las instrucciones de forma
    // // lineal , sin esperar la ejecución de alguina promesa
    // console.log('Fin del Init');

    // parte del ejemplo 1
    //this.getUsuarios();

    // parte del ejemplo 2
    this.getUsuarios().then( usuarios => console.log(usuarios) );
    
  }
  
  
  
  private getUsuarios() {

    // // Ejemplo 1
    // fetch('https://reqres.in/api/users')
    //   .then( resp => {
    //     resp.json().then( body => console.log(body));
    //   });



        // Ejemplo 2 , vinculando una promesa para regresar valores u objetos
        // Con el return, regesa el resolve
    return new Promise( resolve => {
      fetch('https://reqres.in/api/users')
      .then( resp => resp.json() )
      .then( body => resolve( body.data ));
    })
    

  


  }


}
