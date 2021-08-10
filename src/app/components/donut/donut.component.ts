import { Component, Input, OnInit } from '@angular/core';

import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styleUrls: ['./donut.component.css']
})
export class DonutComponent implements OnInit {

  @Input() title: string = 'Sin titulo';
  @Input('labels') doughnutChartLabels: Label[] = ['Label1', 'Label2', 'Label3']
  @Input('data') doughnutChartData: MultiDataSet = [[25, 25, 25]];
  public colors:Color[] = [
    { backgroundColor: ["#6857E6", "#009FEE", "#F02059"]}
  ]
  
  // public doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  // public doughnutChartData: MultiDataSet = [[350, 450, 100]];
    
  constructor() { }
  
  ngOnInit(): void {
  }

}
