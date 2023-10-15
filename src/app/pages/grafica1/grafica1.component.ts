import { Component } from '@angular/core';

import { ChartConfiguration } from 'chart.js';
//import { MultiDataSet, Label  } from 'ng2-charts';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  title = 'ng2-charts-demo';

  // Doughnut
  public doughnutChartLabels: string[] = [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];
  public doughnutChartDatasets: 
      ChartConfiguration<'doughnut'>['data']['datasets'] = [
      { data: [ 350, 450, 100 ], label: 'Series A' },
      // { data: [ 50, 150, 120 ],  label: 'Series B' },
      // { data: [ 250, 130, 70 ],  label: 'Series C' }
    ];

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false
  };


}
