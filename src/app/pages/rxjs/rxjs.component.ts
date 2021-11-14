import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscriber, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';



@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  // Implementando el Ondestroy para que no se quede colgado un observable cuandio
  // salimos de una página
  public intervalSubs: Subscription;

  constructor() { 
    
   // Ejemplo 1 
    // const obs$ = new Observable( observer => {
    //   let i = -1;
    //   const intervalo = setInterval( () => {
    //     i++;
        
    //     // Asigno el dato que voy a exponer cn el observer, en este caso el ejemplo regresa el valor de (i)
    //     observer.next(i);
    //     if ( i == 4 ) {
    //       clearInterval( intervalo );
    //       observer.complete();
    //     }

    //     if ( i == 2 ) {          
    //       clearInterval( intervalo );
    //       observer.error('i llego al valor de 2')
    //     }
    //   }, 
    //     1000 // Se define el intervalo de tiempo, donde 1000 = 1 Segundo
    //   )
    // });

    // // Manejo del resulrado de un observable
    // obs$
    // .pipe(
    //   retry(2) //Numero de reintentos
    // )
    // .subscribe(
    //   valor => console.log('Subs:', valor),
    //   error => console.warn('Error:', error),
    //   () => console.info('Observable terminado')
    // )

     
  
    // // Manejo del resulrado de un observable parte del ejemplo 2
    // this.retornaObservable()
    // .pipe(
    //   retry(2) //Numero de reintentos
    // )
    // .subscribe(
    //   valor => console.log('Subs:', valor),
    //   error => console.warn('Error:', error),
    //   () => console.info('Observable terminado')
    // )

   
    // // Ejemplo 3 con un observable con intervalo
    // this.retornaIntervalo()
    //   .subscribe( console.log )


         
    // Ejemplo 4 Unsubcribe para destruir un observable al salir de una página
    this.intervalSubs =  this.retornaIntervalo().subscribe( console.log )




  } // Fin Constructor

  // Se implemento ngOnDestroy con el ejemplo 4
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  
  // Ligado del ejemplo 2
  private retornaObservable(): Observable<number> {
    //Ejemplo 2
    let i = -1; //En este ejemlo saque el contador del observable
   
    const obs$ = new Observable<number>( observer => {
      const intervalo = setInterval( () => {
        i++;
        
        // Asigno el dato que voy a exponer cn el observer, en este caso el ejemplo regresa el valor de (i)
        observer.next(i);
        if ( i == 4 ) {
          clearInterval( intervalo );
          observer.complete();
        }
   
        if ( i == 2 ) {          
          clearInterval( intervalo );
          observer.error('i llego al valor de 2')
        }
      }, 
        1000 // Se define el intervalo de tiempo, donde 1000 = 1 Segundo
      )
    });
    
     return obs$;
   
     }

    //Ligado con el ejemplo 3 -- Observable con intervalo
    private retornaIntervalo(): Observable<number> {
      return interval(100)
        .pipe(
          map( valor => valor + 1 ), // Lo que hice es con el map, se puede hacer tratamiento al resultado
          filter( valor => ( valor % 2 === 0) ? true:false ), //En este caso estoy tomando el valor resultado del map
          //Nota: lo quite el take(10) para ver ejemplo que se destruya observable al cambiar de página:: take(10), //Cantidad de veces 
        );


    }

}
