import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {
  ngOnInit()  {
    this.btnClass = `btn ${ this.btnClass }`;
  }
  // @Input('valor') progreso: number = 50; //Nota:: renombra la variable progreso como variable valor
  // , en caso de ser necesario y se toma del component.html

  @Input('valor') progreso: number = 40;
  @Input() btnClass: string = 'btn-primary';

  @Output()  valorSalida: EventEmitter<number> = new EventEmitter();


  cambiarValor( valor: number){
    this.progreso = this.progreso + valor;
    if(this.progreso >= 100) {this.progreso = 100};
     if(this.progreso <= 0) {this.progreso = 0};

     this.valorSalida.emit(this.progreso);
     return this.progreso

  }


  onChange( valor: number) {
    //this.cambiarValor(valor);
    if(valor >= 100) {this.progreso = 100}
    else if(valor <= 0) {this.progreso = 0}
    else {this.progreso = valor};

    this.valorSalida.emit(this.progreso);
    return this.progreso
  }


}
