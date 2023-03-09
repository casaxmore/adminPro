import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartType, ChartOptions} from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [],
})
export class DonaComponent implements OnInit{

  @Input() labels :string[]   =  [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];
  @Input() data   :number[]   =  [ 350, 450, 100 ];
  @Input() colors :string[]   =  ['#00DDF0','#0BD9B1','#0CF888'];
  @Input() type   :ChartType  = 'doughnut';
  @Input() title  :string  = 'No title';

  public doughnutChartType!: ChartType;
  public doughnutChartData!: ChartData<'doughnut'>;
  public chartOptions!: ChartOptions;


  ngOnInit(): void {
    this.doughnutChartType = this.type;

    // Doughnut
    this.doughnutChartData =
    {
      labels: this.labels,
      datasets:
      [
        {
          data: this.data,
          backgroundColor: this.colors
        }
      ]
    };

    this.chartOptions =
    {
      responsive: true,
      maintainAspectRatio: false,
    }
  }

}
