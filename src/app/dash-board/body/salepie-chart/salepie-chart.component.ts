import { Component, OnInit } from '@angular/core';
import { LegendPosition } from '@swimlane/ngx-charts';
import { single } from '../salegauge-chart/data';

@Component({
  selector: 'app-salepie-chart',
  templateUrl: './salepie-chart.component.html',
  styleUrls: ['./salepie-chart.component.css']
})
export class SalepieChartComponent implements OnInit {

  single: any[] = [];
  view: any[] = [700, 400];

  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  public legendPosition: LegendPosition = LegendPosition.Below;

  colorScheme = {
    domain: ["#5AA454", "#A10A28", "#C7B42C", "#AAAAAA"]
  };


  constructor() {
    Object.assign(this, { single });
  }

  ngOnInit(): void {
  }

  onSelect(data: any): void {
    console.log("Item clicked", JSON.parse(JSON.stringify(data)));
  }
}
