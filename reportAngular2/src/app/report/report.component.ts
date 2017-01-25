import { Component, OnInit,AfterViewInit } from '@angular/core';

import { GraphDataService } from '../graph-data.service'
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  providers: [GraphDataService],
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  title = 'report works!';
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
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  constructor(private  dataService:GraphDataService) {
    this.dataService.getBarCharData();
    this.testData=this.dataService.myDatas;
    console.log("remote"+this.testData);
    console.log('process getCharDatas');

    console.log('Finish getCharDatas');
    console.log('process consoleCheck');
    this.consoleCheck();


 //   this.testname='123123';
 //    this.lineChartData=[
 //      {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
 //      {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
 //      {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
 //    ];
 //
 //


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
     var v1= this.dataService.getBarChar().subscribe(
      // the first argument is a function which runs on success
      data => { this.charData = data},
      // the second argument is a function which runs on error
      err => console.error(err),
      // the third argument is a function which runs on completion
      () => {
        console.log('done loading bar Char Data');
        console.log('Stage 1');
        console.log(this.charData);
        this.chartArrayA=this.charData.Sa;
        this.chartArrayB=this.charData.Sb;
        this.chartArrayC=this.charData.Sc;
        this.lineChartData = [
          {data:  this.charData.Sa, label: 'Series A'},
          {data:  this.charData.Sb, label: 'Series B'},
          {data:  this.charData.Sc, label: 'Series C'}
        ];
        return this.charData;
      }

    );
     console.log("my this.lineChartData  :"+ v1.data);





  }



  // lineChart
//   public lineChartData:Array<any> = [
//   {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
//   {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
//   {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
// ];




}
