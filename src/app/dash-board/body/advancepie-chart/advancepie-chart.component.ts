import { Component, OnInit } from '@angular/core';
import { single } from '../salegauge-chart/data';

@Component({
  selector: 'app-advancepie-chart',
  templateUrl: './advancepie-chart.component.html',
  styleUrls: ['./advancepie-chart.component.css']
})
export class AdvancepieChartComponent implements OnInit {

  width = "500";
  height = "250";
  type = "pareto2d";
  dataFormat = "json";
  dataSource = data;
  // single: any[] = [];
  // view: any[] = [600, 400];

  // gradient: boolean = true;
  // showLegend: boolean = false;
  // showLabels: boolean = true;
  // isDoughnut: boolean = false;

  // colorScheme = {
  //   domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  // };

  constructor() {

    // Object.assign(this, { single });
  }

  ngOnInit(): void {
  }

  // onSelect(data: any): void {
  //   console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  // }

  // onActivate(data: any): void {
  //   console.log('Activate', JSON.parse(JSON.stringify(data)));
  // }

  // onDeactivate(data: any): void {
  //   console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  // }

}

const data = {
  chart: {
    // caption: " Sales Profit",
    theme: "fusion",
    decimals: "1",
    drawcrossline: "1"
  },
  data: [
    {
      label: "Hard-Disk",
      value: "40",
      "color": "e9967a"
    },
    {
      label: "PCB",
      value: "22",
      "color": "#e9967a"
    },
    {
      label: "Printer",
      value: "12",
      "color": "#e9967a"
    },
    {
      label: "CDROM",
      value: "10",
      "color": "#e9967a"
    },
    {
      label: "Keyboard",
      value: "6",
      "color": "#e9967a"
    }
  ]
};
