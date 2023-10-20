import { Component, OnDestroy } from '@angular/core';
import { valueOrDefault } from 'chart.js/dist/helpers/helpers.core';
import { Observable, Subscription, filter, interval, map, retry, take } from 'rxjs';
import { LoginComponent } from 'src/app/auth/login/login.component';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

public intervalSubs: Subscription;

  constructor() {
  // // Iniciamos elobservable para trabajar con el
  // this.retornaObservable().pipe(
  //   retry(2)
  // ).subscribe( 
  //   valor => console.log('subs:', valor),
  //   error => console.warn( 'Error:', error),
  //   ()  => console.info('Observable terminado')
  //   );

  this.intervalSubs = this.retornaIntervalo().subscribe(console.log);

} // Fin constructor

  ngOnDestroy(): void {
    // Destruye el observable al momento de salir de la pagina
    this.intervalSubs.unsubscribe();
  }

retornaIntervalo(): Observable<number> {
  return interval(100)
        .pipe(
          //take(10),
          map( valor => valor + 1 ),
          filter( valor => ( valor % 2 === 0) ? true:false ),
        );
  
}


retornaObservable(): Observable<number> 
{
  let i = -1;

  return new Observable<number>( observer =>{

    const intervalo = setInterval(()=>{
      i++;
      
      observer.next(i); //Aqui se enlaza con el Observable y le transfiere el valor

      if ( i === 4){
        clearInterval( intervalo );
        observer.complete();
      }

      if(i === 2){
        //i = -1;
        observer.error('contador "i" llego al valor de 2 ');
      }

    }, 1000 )

  });  
}


}
