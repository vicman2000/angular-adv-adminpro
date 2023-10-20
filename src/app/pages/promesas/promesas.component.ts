import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  
  ngOnInit(): void {

    this.getUsuarios().then( usuarios =>{
      console.log(usuarios);      
    })


    /** primer forma de trabajar una promesa */
    // const promesa = new Promise( ( resolve, reject) =>{      
    //   if ( false ) {
    //     resolve('Ok .. Hola Munfo');
    //   } else {
    //     reject('Fail .. Algo salio mal');
    //   }
    // });

    // promesa.then( (mensaje) =>{
    //   console.log(mensaje);      
    // })
    // .catch( error => console.log('Error en la promesa Err:: ' , error ));

    // console.log('Fin del Init');
    
  
    /** OJO::: Segunda forma de tranajar una promsa */

    
  }

  getUsuarios(){  
    return new Promise ( resolve => {
      fetch('https://reqres.in/api/users')
        .then( resp => resp.json() )
        .then( body => resolve( body.data ));
    });    
        
  }
}
