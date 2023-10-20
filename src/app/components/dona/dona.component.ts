import { Component, Input, OnInit } from '@angular/core';

import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})

export class DonaComponent implements OnInit {
  ngOnInit()  {
    // console.log('Hola Vicman..: ' + this.titulo);
    // console.log(this.dataValue);
    // console.log(this.dataSetValue);
    
  }

@Input() titulo: string = "Gráfica";


  // Doughnut
 @Input('etiquetas') doughnutChartLabels: string[] = [ 'Label-1', 'Label-2', 'Label-300' ];

  // public doughnutChartDatasets: 
  //     ChartConfiguration<'doughnut'>['data']['datasets'] = [
  //     { data: [ 350, 450, 100 ], label: 'Series A' },
  //     // { data: [ 50, 150, 120 ],  label: 'Series B' },
  //     // { data: [ 250, 130, 70 ],  label: 'Series C' }
  //   ];

@Input('dataV') dataValue = [ 50, 50, 50 ];
@Input('dataSetV') dataSetValue: string = 'serie AA';

public doughnutChartDatasets: 
        ChartConfiguration<'doughnut'>['data']['datasets'] = [
        { data: this.dataValue, label: this.dataSetValue },
      ];
  


  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false
  };

  // public colors: Colors[] = [
  //   { backgroundColor: ['#6857E6','#009FEE','#F02059'] }
  // ];
}
