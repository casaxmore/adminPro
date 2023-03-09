import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [],
})
export class Grafica1Component {
  public labels1: string[] = [
    'Pan',
    'Limones',
    'Miel',
  ];

  public data1: number[] = [
    20,
    100,
    88
  ];

  public color1: string[] = [
    '#32051c',
    '#740d43',
    '#a71360'
  ];

}
