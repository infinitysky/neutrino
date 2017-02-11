import { Component, OnInit,AfterViewInit } from '@angular/core';

import { GraphDataService } from '../services/graph-data.service'

import { barchartDataClass } from "../interfaces/barchart.interface"
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  providers: [GraphDataService],
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  title = 'report works!';
  barcharDataArray:barchartDataClass[];

  public testname:string;
  public testArray:Array<any>;
  public testData:any;

  public charData:any;
  public chartArrayA:Array<any>;
  public chartArrayB:Array<any>;
  public chartArrayC:Array<any>;
  public lineChartData:Array<any>;
  public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];


  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  // events
  public chartClicked(e:any):void {
    console.log(e);
    var tem:Array<any>=[{data: [22, 55, 80, 71, 64, 33, 31], label: 'Series D'}];

    var newColor:Array<any>=[ { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,555,51)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }];

    this.lineChartData.push(tem);
    this.lineChartColors.push(newColor);
    this.lineChartData=this.lineChartData.slice();
    this.lineChartColors=this.lineChartColors.slice();
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  constructor(private  dataService:GraphDataService) {
    // this.lineChartData=[
    //   {data:0, label: 'N.A'},
    //   {data:0, label: 'N.A'},
    //   {data:0, label: 'N.A'}
    //
    //      ];
    this.lineChartData=[
      {data:0, label: 'N.A'},
      {data:0, label: 'N.A'},
      {data:0, label: 'N.A'}

    ];


    setTimeout(() =>
      {
        this.getCharDatas();
      },
      3000);
    //this.getCharDatas();



  }


  consoleCheck(){
    console.log("consoleCheck");
    console.log('Stage 2');
    console.log(this.charData);
  }

  ngOnInit() {


  }
  ngAfterViewInit(){

  }

  public getCharDatas():any {
     this.dataService.getBarChar().subscribe(
      // the first argument is a function which runs on success
      data => { this.charData = data},
      // the second argument is a function which runs on error
      err => console.error(err),
      // the third argument is a function which runs on completion
      () => {
        console.log('done loading bar Char Data');
        console.log('Stage 1');

        this.chartArrayA=this.charData.Sa;
        this.chartArrayB=this.charData.Sb;
        this.chartArrayC=this.charData.Sc;




        this.lineChartData= [
          {data:  this.charData.Sa, label: 'Series A'},
          {data:  this.charData.Sb, label: 'Series B'},
          {data:  this.charData.Sc, label: 'Series C'}
        ];
        // var i=0;
        // for(i=0;i<tempArray.length;i++){
        //   this.lineChartData.push(tempArray[i]);
        // }
        //
        // console.log("temp Array: "+tempArray);

        // this.barcharDataArray.push(new barchartDataClass(this.charData.Sa,'Series A'));
        // this.barcharDataArray.push(new barchartDataClass(this.charData.Sb,'Series B'));
        // this.barcharDataArray.push(new barchartDataClass(this.charData.Sc,'Series C'));




       // this.lineChartData=this.lineChartData.slice();

        //let tem:Array<any>=[{data: [22, 55, 80, 71, 64, 33, 31], label: 'Series D'}];
        //this.lineChartData.push([{data: [22, 55, 80, 71, 64, 33, 31], label: 'Series D'}]);
        this.lineChartData=this.lineChartData.slice();
        console.log("lineChartData Array: "+this.lineChartData);

      }

    );






  }



  // lineChart
//   public lineChartData:Array<any> = [
//   {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
//   {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
//   {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
// ];




}
