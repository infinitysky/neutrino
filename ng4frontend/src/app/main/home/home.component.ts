import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


// 3rd-party libraries

declare var swal: any;
declare var c3: any;


// services
import { HomepageService } from '../okr/okr-shared/services/home-page.service';
import { MyCookieService } from '../../shared/services/my-cookie.service';

// Classes
import { Goalclass } from '../okr/okr-shared/classes/goal-class';
import { Userclass } from '../../shared/classes/user-class';
import { Objectiveclass } from '../okr/okr-shared/classes/objective-class';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',

  providers: [ HomepageService ],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  public currentTimeFrame: any;
  public currentUser: Userclass;


  public tempData: any;
  public errorMessage: any;

  public homePageInfo: any;
  public objectivesNumber: number;
  public keyResultNumber: number;
  public totalProgressNumber: number;

  public currentTimeFrameId: any;
  public timeFrameIdSubscription: any;

  public objectivesInfo: Objectiveclass[];
  public goalsInfo: Goalclass[];
  public companyGoalsInfo: Goalclass[];
  public goalsNumber: number;
  public goalsTotalProgress: number;
  public companyGoalsTotalProgress: number;

  /* ------------Charts---------------- */
  public doughnutChartLabels: string[];
  public doughnutChartData: number[];
  public doughnutChartType: string;
  public doughnutChartOptions: any;


  constructor(  private _activatedRoute: ActivatedRoute,
                private _router: Router,
                private _cookieService: MyCookieService,
                private _homepageService: HomepageService
  ) {
    this.tempData = '';
    this.errorMessage =  '';
    this.homePageInfo = '';
    this.objectivesNumber = 0;
    this.keyResultNumber = 0;
    this.totalProgressNumber = 0;
    this.goalsNumber = 0;
    this.objectivesInfo = new Array<Objectiveclass>();;
    this.goalsInfo = new Array<Goalclass>();
    this.companyGoalsInfo = new Array<Goalclass>();
    this.companyGoalsTotalProgress = 0;

    /* ------------Charts---------------- */
    this.doughnutChartLabels = ['Uncompleted', 'Completed'];
    this.doughnutChartData = [100, 0]; // Uncompleted on left !
    this.doughnutChartType = 'doughnut';
    this.doughnutChartOptions ={
      legend: {
        display: false,
      },
      responsive: true,
      tooltips:{
        enabled: false
      }
    };

  }

  ngOnInit() {
    this.updateGoalsData(0);
    this.timeFrameIdSubscribe();

  }



  timeFrameIdSubscribe(){

    this.timeFrameIdSubscription = this._activatedRoute.queryParams.subscribe(params => {
      // Defaults to 0 if no query param provided.
      this.currentTimeFrameId = +params['timeFrameId'] || 0;
      if(this.currentTimeFrameId && this.currentTimeFrameId != 0){
        this.getCurrentInfo(this.currentTimeFrameId );
      }

    });

  }


  getCurrentInfo(currentTimeFrameId){
    this.currentUser = this._cookieService.getCookieCurrentUser();
    //this.currentTimeFrame = this._cookieService.getCookieCurrentTimeFrame();
    this._homepageService.getHomeInfo(this.currentUser.user_id, currentTimeFrameId).subscribe(
      data => this.tempData = data,
      error => this.errorMessage = <any>error,
      () => {

        this.objectivesInfo = new Array<Objectiveclass>();;
        this.goalsInfo = new Array<Goalclass>();
        this.companyGoalsInfo = new Array<Goalclass>();


        if (this.tempData.status == 'success'){

          if(this.tempData.objectives){
            this.objectivesInfo = <Objectiveclass[]> this.tempData.objectives;
            this.objectivesCalculation( this.objectivesInfo );

          }
          if(this.tempData.goals){
            this.goalsInfo = <Goalclass[]> this.tempData.goals;
            this.goalsCalculation(this.goalsInfo);
          }
          if (this.tempData.companyGoals){
            this.companyGoalsInfo = <Goalclass[]>this.tempData.companyGoals;
            this.companyGoalsCalculation(this.companyGoalsInfo);

          }

        }else {
          console.log('error');
        }

      }

    );

  }

  objectivesCalculation(ObjectivesInfo: Objectiveclass[]){
    //console.log(ObjectivesInfo);
    var x = 0;
    var y = 0;
    var z = 0;
    this.objectivesNumber = 0;
    this.keyResultNumber = 0;

    if (ObjectivesInfo){
      this.objectivesNumber = ObjectivesInfo.length;
      for (y = 0 ;y < ObjectivesInfo.length;y++){
        this.keyResultNumber = this.keyResultNumber + ObjectivesInfo[y].keyResult_array.length;
      }
    }
  }

  goalsCalculation(GoalsInfo: Goalclass[]){

    var i = 0;
    let goalsProgress = 0;
    if (GoalsInfo){
      this.goalsNumber = GoalsInfo.length;
      for (i = 0; i < GoalsInfo.length; i++ ){
        goalsProgress = goalsProgress + Number(GoalsInfo[i].goal_progress_status);
      }
      this.goalsTotalProgress = goalsProgress / (GoalsInfo.length);
    }

  }

 companyGoalsCalculation(GoalsInfo: Goalclass[]){

    var i = 0;
    let goalsProgress = 0;
    if (GoalsInfo && GoalsInfo.length > 0){
      this.goalsNumber = GoalsInfo.length;
      for (i = 0; i < GoalsInfo.length; i++ ){
        goalsProgress = goalsProgress + Number(GoalsInfo[i].goal_progress_status);
      }
      this.companyGoalsTotalProgress = goalsProgress / (GoalsInfo.length);

    }else {
      this.companyGoalsTotalProgress = 0;
    }

   this.updateGoalsData( this.companyGoalsTotalProgress);

  }


  /*-------------------------Charts------------------------------------*/


  updateGoalsData(currentStatus: number){
    let progressNumber = 0;
    if (!currentStatus){
      progressNumber = 0;
      this.companyGoalsTotalProgress = 0;
    }else{
      progressNumber = currentStatus;
    }

    this.doughnutChartData = [100 - progressNumber, progressNumber];


  }





}
