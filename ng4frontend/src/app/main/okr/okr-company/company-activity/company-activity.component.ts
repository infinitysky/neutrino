import { Component, OnInit } from '@angular/core';


import {Subscription} from 'rxjs/Subscription';


import {Activityclass}from '../../okr-shared/classes/activitie-class';
import {OkrActivitiesService}from '../../okr-shared/services/okr-activities.service';
import {UserInfoContainerService} from '../../../../shared/services/user-info-container.service';

@Component({
    selector: 'app-company-activity',
    templateUrl: './company-activity.component.html',
    providers:[OkrActivitiesService],
    styleUrls: ['./company-activity.component.css']
})
export class CompanyActivityComponent implements OnInit {
    public content :any;
    public activities: Activityclass[];

    public sortingActivities:Activityclass[];
    public retryTimes : number;


    public buttonIO:boolean;
    private errorMessage : any;
    private viewTeamId:any;
    private tempData:any;

    private subscribeTeamActivity:any;
    private subscriveTimeFrame:any;


    private selfUserInforData:any;
    private selfInfoSubscription:Subscription;

    private subscribeTimeFrameData:any;
    private timeFrameDataSubscription:Subscription;



    constructor(private _okrActivitiesService:OkrActivitiesService,
                private _userInfoContainerService:UserInfoContainerService,
    ) {
        this.content='';
        this.viewTeamId='';
        this.activities=[];
        this.buttonIO=true;
        this.selfUserInforData='';
        this.sortingActivities=[];
        this.retryTimes=5;





    }

    ngOnInit() {



        this.getCurrentUserInfo();
        this.getCurrentTimeFrame();

    }

    ngOnDestroy() {

        this.selfInfoSubscription.unsubscribe();
    }

    getUserActivities(){
        console.log("Current User activities activity");
        this._okrActivitiesService.getByTeamId(this.viewTeamId).subscribe(
            data=>this.tempData=data,
            error=>this.errorMessage=<any>error,
            ()=>{
                if(this.tempData && this.tempData.data){

                    this.activities=this.tempData.data;

                }

            }

        );
    }


    getCurrentUserInfo(){
        this.selfInfoSubscription=this._userInfoContainerService.userInfo$.subscribe(userInfo=>this.selfUserInforData=userInfo);
        console.log("self Info"+ JSON.stringify(this.selfUserInforData.user_id));


    }

    getCurrentTimeFrame(){
        this.subscribeTimeFrameData

    }

    submitNoteButton(inputString:any){
        this.buttonIO=true;
        this.content=inputString
        console.log(this.content);
        var i=0;

        let activityType='note';

        let myID=this.selfUserInforData.user_id;
        console.log("myID" + myID);
        if(true==this.buttonIO){
            this._okrActivitiesService.addNew(this.content,activityType,myID).subscribe(
                data=>this.tempData=data,
                error=>this.errorMessage=<any>error,
                ()=>{
                    if(this.tempData.data && this.tempData&& <Activityclass>this.tempData.data){
                        var tempSortingArray=[];

                        let newActivity=<Activityclass>this.tempData.data;
                        for(i=0;i<this.activities.length;i++){
                            if(newActivity.activity_timestamp > this.activities[i].activity_timestamp){
                                tempSortingArray.push(newActivity);
                            }else{
                                tempSortingArray.push(this.activities[i]);
                            }
                        }
                        this.activities=tempSortingArray;
                        this.content='';
                        this.buttonIO=false;
                    }
                }
            );
        }
    }

}
