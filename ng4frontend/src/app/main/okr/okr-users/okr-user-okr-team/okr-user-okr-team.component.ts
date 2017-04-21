import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
// Observable class extensions
import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { Subscription } from 'rxjs/Subscription';



import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NouisliderModule } from 'ng2-nouislider';


//import swal from 'sweetalert2'
declare var swal: any;


// services here
import { SettingGoalService } from '../../okr-shared/services/okr-goal.service';//goal data service
import { SettingTimeFrameService } from '../../okr-shared/services/okr-time-frame.service';//time frame data service
import { SettingTeamService } from '../../okr-shared/services/okr-team.service';//team data service
import { SettingObjectiveService } from '../../okr-shared/services/okr-objective.service';//objective data service
import { SettingKeyResultService } from '../../okr-shared/services/okr-key-result.service';//key result data service
import {OkrActivitiesService} from '../../okr-shared/services/okr-activities.service'; // activity data service. submit 'create' and 'update'
import { OkrUserTeamsObjectivesService } from '../../okr-shared/services/okr-user-teams-objectives.service';

//sharing info services
import { ShareUserOkrinfoService } from '../share-user-okrinfo.service';//in module global services... this service must set as provider in module, but not set in any component
import {UserInfoContainerService} from '../../../../shared/services/user-info-container.service'; //Global information sharing services. It contained users personal information.


//classes here
import { Timeframeclass } from '../../okr-shared/classes/time-frame-class';
import { Teamclass } from '../../okr-shared/classes/team-class';
import { Goalclass } from '../../okr-shared/classes/goal-class';
import { Objectiveclass } from '../../okr-shared/classes/objective-class';
import {Keyresultclass} from '../../okr-shared/classes/key-restult-class';
import {Activityclass} from '../../okr-shared/classes/activitie-class';
import {Userclass} from '../../../../shared/classes/user-class';




@Component({
  selector: 'app-okr-user-okr-team',
  templateUrl: './okr-user-okr-team.component.html',
    providers:[SettingGoalService,
        SettingTimeFrameService, SettingTeamService,
        SettingObjectiveService, SettingKeyResultService,
        OkrActivitiesService, OkrUserTeamsObjectivesService],
  styleUrls: ['./okr-user-okr-team.component.css']
})
export class OkrUserOkrTeamComponent implements OnInit {


    public modalTitle: string;


    public goals: Goalclass[];
    public timeFrames: Timeframeclass[];
    public teams: Teamclass[];
    public personalObjectives: Objectiveclass[];
    public teamObjectives: Objectiveclass[];
    public keyresults: Keyresultclass[];
    public teamkeyresults: Keyresultclass[];


    public newSubmitActivity: Activityclass;



    //modal parameter

    public errorMessage: any;

    public isLoaded: boolean = true;


    public tempData: any;


    //modal action control
    animation: boolean = true;
    keyboard: boolean = true;
    backdrop: string | boolean = "static";
    public modalType:string=''; //objective | keyresult



    //current model
    public editModeIO: number;


    //edit mode parameter
    public editObjective: any;
    public parentObjective: any;
    public editKeyResult: any;
    public editReview: any;







    public objectiveNameInputBoxValue: string;
    public objectiveDescriptionInputBoxValue: string;

    public keyresultNameInputBoxValue: string;
    public keyresultDescriptionInputBoxValue: string;


    public keyresultProgressValue: any;
    public progressUpdateDescription: string;


    //Dropdownlist;
    public timeFrameDropDownListOptions: any;
    public selectedTimeFrame: any;

    public goalsDropDownListOptions: any;
    public selectedGoal: any;



//TODO: DO we have to set the tag on key-result?


    public tagDropDownListOptions: any;
    public selectedTag: any;




    //For sharing service
    public totalObjectivesNumber: any;

    public overallProgressNumber: any;

    public overallProgressNumberSubscription: Subscription;
    public overallObjectivesNumberSubscription: Subscription;

    public selfUserInfoData: Userclass;
    public selfInfoSubscription: Subscription;
    public targetUserInfoData: Userclass;
    public targetInfoSubscription: Subscription;


    public currentTimeFrameId: any;
    public timeFrameIdSubscription: any;


    public routerParamsSubscription:any;
    public viewUserID: any;

//Multi Selection for Goals
    public goalsSelectorSettings: IMultiSelectSettings = {
        pullRight: false,
        enableSearch: true,
        checkedStyle: 'fontawesome',
        buttonClasses: 'btn btn-default',
        selectionLimit: 0,
        closeOnSelect: false,
        showCheckAll: true,
        showUncheckAll: true,
        dynamicTitleMaxItems: 2,
        maxHeight: '300px',
    };

    public goalsSelectorTexts: IMultiSelectTexts = {
        checkAll: 'Check all',
        uncheckAll: 'Uncheck all',
        checked: 'checked',
        checkedPlural: 'checked',
        searchPlaceholder: 'Search...',
        defaultTitle: 'Select Goals',
    };






    constructor(private _okrUserTeamsObjectivesService:OkrUserTeamsObjectivesService,
        private _settingGoalService: SettingGoalService,
                private _settingTimeFrameService: SettingTimeFrameService,
                private _settingTeamService: SettingTeamService,
                private _settingObjectiveService: SettingObjectiveService,
                private _settingKeyResultService: SettingKeyResultService,
                private _shareUserOkrinfoService:ShareUserOkrinfoService,
                private _userInfoContainerService: UserInfoContainerService,
                private _okrActivitiesService: OkrActivitiesService,
                private _activatedRoute : ActivatedRoute) {


        this.viewUserID="";
        this.modalTitle="";

        this.goals = [];
        this.timeFrames = [];


        this.teams = [];
        this.personalObjectives = [];
        this.teamObjectives = [];
        this.keyresults = [];



        this.editModeIO = 0;
        this.editObjective = new Objectiveclass();

        this.objectiveNameInputBoxValue = '';
        this.objectiveDescriptionInputBoxValue = '';

        this.editKeyResult = new Keyresultclass();
        this.keyresultNameInputBoxValue = '';
        this.keyresultDescriptionInputBoxValue = '';


        //Drop Down List
        this.timeFrameDropDownListOptions = [];
        this.selectedTimeFrame = [];


        this.goalsDropDownListOptions = [];
        this.selectedGoal = []; // multi selector is using different plugin

        this.totalObjectivesNumber = ' - ';
        this.newSubmitActivity = new Activityclass();
        this.selfUserInfoData = new Userclass();





        this.tagDropDownListOptions = [{ id: "None", text: "None" }, { id: "Warning", text: "Warning" }, { id: "Risk", text: "Risk" }, { id: "Complete", text: "Complete" }];

        this.selectedTag = [{ id: "None", text: "None" }];


    }


    ngOnInit() {
        this.routerSubscription();
        this.getCurrentUserInfo();

        this.getOverallProgressNumber();
        this.getTotalObjectivesNumber();
        this.targetSubscription();



    }
    ngOnDestroy() {
        this.timeFrameIdSubscription.unsubscribe();
        this.overallObjectivesNumberSubscription.unsubscribe();
        this.overallProgressNumberSubscription.unsubscribe();
        this.routerParamsSubscription.unsubscribe();
        this.targetInfoSubscription.unsubscribe();
    }


    routerSubscription(){
        //console.log("Router params userID:"+ this._activatedRoute.snapshot.params['userid']);
        this.routerParamsSubscription = this._activatedRoute.params.subscribe(params => {
            this.viewUserID = ''+params['userid']; // (+) converts string 'id' to a number
            console.log("User OKRs this.viewUserID"+this.viewUserID);
            // In a real app: dispatch action to load the details here.
            this.viewUserID=Number(this._activatedRoute.snapshot.params['userid']);



            this.timeFrameIdSubscribe();



        });
    }


    timeFrameIdSubscribe(){

        this.timeFrameIdSubscription = this._activatedRoute.queryParams.subscribe(params => {
            // Defaults to 0 if no query param provided.
            this.currentTimeFrameId = +params['timeFrameId'] || 0;

            console.log('Query param currentTimeFrame: ', this.currentTimeFrameId);


            this.getTargetUserTeamOKRs(this.viewUserID,this.currentTimeFrameId );
           // this.getCurrentInfo();
        });

    }




    modalSaveChangeButton() {
        // read the 2 way binding;
        var objectiveNameInput= this.objectiveNameInputBoxValue;
        var objectiveDescription= this.objectiveDescriptionInputBoxValue;


        console.log("objectiveNameInput : "+ objectiveNameInput);
        console.log("objectiveDescription : "+ objectiveDescription);


        if (0 == this.editModeIO) {
            this.createNewObjective(objectiveNameInput, objectiveDescription);
        } else {
            this.updateObjective(this.editObjective, objectiveNameInput, objectiveDescription);
        }
    }





    modalSaveObjectiveChangeButton() {
        // read the 2 way binding;
        var objectiveNameInput = this.objectiveNameInputBoxValue;
        var objectiveDescription = this.objectiveDescriptionInputBoxValue;

        if (0 == this.editModeIO) {
            this.createNewObjective(objectiveNameInput, objectiveDescription);
        } else {
            this.updateObjective(this.editObjective, objectiveNameInput, objectiveDescription);
        }
    }


    modalSaveKeyResultChangeButton() {
        // read the 2 way binding;
        var keyResultNameInput=this.keyresultNameInputBoxValue;
        var keyResultDescription=this.keyresultDescriptionInputBoxValue;





        if (0 == this.editModeIO) {
            this.createNewKeyResult(keyResultNameInput, keyResultDescription,this.parentObjective);
        } else {
            this.updateKeyResult(this.editKeyResult, keyResultNameInput, keyResultDescription);
        }
    }




    modalSaveKeyResultProgressChangeButton() {
        // read the 2 way binding;
        var progressUpdateDescription=this.progressUpdateDescription;

        this.progressUpdate( this.editKeyResult, progressUpdateDescription );

        this.modalType='';
        this.modalTitle='';
        this.progressUpdateDescription='';
        this.editModeIO = 0;
        this.editKeyResult=new Keyresultclass();


        this.updateProgressModal.hide();

    }


    editObjectiveButton(objective:Objectiveclass) {
        this.modalTitle="Update A Objective";

        this.editModeIO = 1;
        this.editObjective = objective;
        this.objectiveNameInputBoxValue = objective.objective_name;
        this.objectiveDescriptionInputBoxValue = objective.objective_description;



        this.selectedTag = [{ id: objective.objective_status, text: objective.objective_status }];

        this.getAllTimeFrames();



    }


    addObjectiveButton() {
        this.getAllGoals();

        this.modalTitle="Create A Objective";
        this.editModeIO = 0;
        this.selectedTag = [{ id: "None", text:"None"}];
        this.selectedGoal = [];
        this.objectiveNameInputBoxValue = '';
        this.objectiveDescriptionInputBoxValue = '';

        this.objectiveModal.show();

    }

    addKeyResultButton(parentObjective) {
        this.modalType = 'keyresult';
        this.modalTitle = 'Create A Key Result';
        this.editModeIO = 0;

        this.parentObjective = parentObjective;

        this.keyresultNameInputBoxValue = '';
        this.objectiveDescriptionInputBoxValue = '';
        this.keyresultProgressValue=0;
        this.keyResultModal.show();

    }

    closeObjectiveButton() {

        this.modalType = '';
        this.modalTitle = '';
        this.editModeIO = 0;
        this.objectiveNameInputBoxValue = '';
        this.objectiveDescriptionInputBoxValue = '';
        this.objectiveModal.hide();

    }

    closeKeyResultButton() {
        this.modalType='';
        this.modalTitle='';
        this.editModeIO = 0;
        this.keyresultNameInputBoxValue = '';
        this.keyresultDescriptionInputBoxValue = '';
        this.keyresultProgressValue=0;
        this.keyResultModal.hide();
    }


    closeKeyResultProgressChangeButton() {
        this.updateProgressModal.hide();


        this.rollBackObjectiveKeyResults();

        this.progressUpdateDescription = '';
        this.modalType='';
        this.modalTitle='';
        this.editModeIO = 0;


    }




    createNewKeyResult(keyResultNameInput: string, keyResultDescription: string, parentObjective:Objectiveclass) { // now I start use 2-way binding to process this

        if (!keyResultNameInput || !keyResultDescription || !parentObjective) {
            //alert("Do not leave any empty!");

            this.displayWarningMessage("Objective Name or Objective Description empty!");
            return;
        }
        else {

            var newKeyResult = new Keyresultclass();
            newKeyResult.result_name=keyResultNameInput;
            newKeyResult.result_description=keyResultDescription;
            newKeyResult.result_progress_status="0";
            newKeyResult.objective_id=parentObjective.objective_id;
            this._settingKeyResultService.addNewbyResult(newKeyResult).subscribe(
                data => this.tempData = data,
                error => this.errorMessage = <any>error,
                () => {

                    if (this.tempData.status == "success" && this.tempData.data) {
                        var tempInfo = <Keyresultclass>this.tempData.data;

                        var i = 0;
                        for (i = 0; i < this.teamObjectives.length; i++) {
                            if(this.teamObjectives[i].objective_id == tempInfo.objective_id){
                                this.teamObjectives[i].keyResult_array.push(tempInfo);
                                this.teamkeyresults.push(tempInfo);
                                break;
                            }
                        }

                        this.keyresultDescriptionInputBoxValue = '';
                        this.keyresultNameInputBoxValue = '';
                        this.editModeIO = 0;
                        this.modalTitle = '';
                        this.modalType = '' ;

                        var submitANewActivity = new Activityclass();
                        submitANewActivity.user_id = this.selfUserInfoData.user_id;
                        submitANewActivity.activity_detail = ' Created a new Key Result :' + tempInfo.result_name;
                        submitANewActivity.activity_type = 'Create';
                        this.submitActivity(submitANewActivity);

                        this.calculateObjectivesProgress();
                    }

                    else{
                        this.displayErrorMessage(this.tempData.errorMassage);
                    }
                }
            );


        }

        this.keyResultModal.hide();
    }



    updateKeyResult(editObjective, objectiveNameInput: string, objectiveDescription: string) {

        if (!objectiveNameInput||!objectiveDescription) {

            this.displayWarningMessage("Objective Name or Objective Description empty!");

            return;
        } else {

            let originalObjective = editObjective;


            editObjective.objective_description = objectiveDescription;
            editObjective.objective_name = objectiveNameInput;
            var goalIds = this.selectedGoal;
            var goalStatusTag =this.selectedTag[0].id;

            // editObjective.object = timeFrameId;

            editObjective.goal_status=goalStatusTag;

            this._settingObjectiveService.update(editObjective)
                .subscribe(
                    data => { this.tempData = data },
                    error => this.errorMessage = <any>error,
                    () => {


                        if(this.tempData.status == "success" && this.tempData.data)  {



                            // this.updateTeamMembers(editTeam,this.memberSelectedOptions);
                            this.objectiveNameInputBoxValue = '';
                            this.objectiveDescriptionInputBoxValue = '';

                            var submitANewActivity= new Activityclass();

                            var modifyLog = " ";
                            if (originalObjective.objective_description !=editObjective.objective_description){
                                modifyLog=modifyLog+" Change Objective description  to"+ editObjective.objective_description+"; ";
                            }
                            if (originalObjective.objective_name!=editObjective.objective_name){
                                modifyLog=modifyLog+"Change Objective name to"+ editObjective.objective_name+"; ";
                            }
                            if (originalObjective.objective_status!=editObjective.objective_status){
                                modifyLog=modifyLog+"Change Objective tag to"+ editObjective.objective_status+"; ";
                            }

                            submitANewActivity.user_id=this.selfUserInfoData.user_id;
                            submitANewActivity.activity_detail = "Updated key Result : "
                                + editObjective.goal_name+ " update log : "+modifyLog ;
                            submitANewActivity.activity_type="Update";
                            this.submitActivity(submitANewActivity);

                            this.calculateObjectivesProgress();

                            this.displaySuccessMessage("Your key Result has been updated. <br> affectRows: " + this.tempData.data.affectRows);
                        }else {

                            swal("Error!", this.tempData.errorMassage, "error");
                            this.displayErrorMessage(this.tempData.errorMassage);
                        }

                    }
                );

        }

        this.keyResultModal.hide();

    }


    progressUpdate(keyResult: Keyresultclass , progressUpdateDescription){
        this._settingKeyResultService.update(keyResult).subscribe(
            data => this.tempData = data,
            error => this.errorMessage = <any> error,
            () => {
                if(this.tempData.status == 'success' && this.tempData.data){
                    if(this.tempData.data.affectRows && this.tempData.data.affectRows >0){
                        var submitANewActivity = new Activityclass();
                        submitANewActivity.user_id = this.selfUserInfoData.user_id;
                        submitANewActivity.activity_detail = ' Updated a new Key Result Progress Status :' + progressUpdateDescription;
                        submitANewActivity.activity_type = 'Update';
                        this.submitActivity(submitANewActivity);
                        this.displaySuccessMessage('Success Update Progress');


                        this.calculateObjectivesProgress();
                    }
                }
            }
        );


    }










    targetSubscription(){
        this.targetInfoSubscription=this._shareUserOkrinfoService._targetUserInfo$.subscribe(targetInfo=>this.targetUserInfoData=targetInfo);
    }


    getCurrentUserInfo(){
        this.selfInfoSubscription=this._userInfoContainerService.userInfo$.subscribe(userInfo=>this.selfUserInfoData=userInfo);
        console.log("self Info"+ JSON.stringify(this.selfUserInfoData.user_id));

    }



    getTargetUserTeamOKRs(targetUserId:any,timeFrameId:any){


        this._okrUserTeamsObjectivesService.getUserTeamsInfoByTimeFrameId(targetUserId, timeFrameId ).subscribe(
            data=> this.tempData = data,
            error=> this.errorMessage = <any>error,
            ()=>{
                if(this.tempData.data && <Objectiveclass[]>this.tempData.data){
                    this.teamObjectives = this.tempData.data;
                    console.log( this.teamObjectives );
                }

            }
        );




    }


    getAllTimeFrames() {
        this._settingTimeFrameService.getAllTimeFrames()
            .subscribe(
                data => this.tempData = data,
                error => this.errorMessage = <any>error,
                () => {


                    if (this.tempData.status == "success" && this.tempData.data) {
                        this.timeFrames =<Timeframeclass[]> this.tempData.data;
                        this.setTimeFrameDropDownList(this.timeFrames);
                    }
                }
            );

    }






    //TODO: Fix the date format handling issue.
    updateObjective(editObjective, objectiveNameInput: string, objectiveDescription: string) {

        if (!objectiveNameInput||!objectiveDescription) {

            this.displayWarningMessage("Objective Name or Objective Description empty!");

            return;
        } else {

            let originalObjective=editObjective;


            editObjective.objective_description = objectiveDescription;
            editObjective.objective_name = objectiveNameInput;

            var goalIds = this.selectedGoal;
            var objectiveStatusTag =this.selectedTag[0].id;

            // editObjective.object = timeFrameId;

            editObjective.status=objectiveStatusTag;

            this._settingObjectiveService.update(editObjective)
                .subscribe(
                    data => { this.tempData = data },
                    error => this.errorMessage = <any>error,
                    () => {
                        console.log("update Members this.tempData + " + JSON.stringify(this.tempData));
                        console.log(this.tempData.data);

                        if(this.tempData.status == "success" && this.tempData.data)  {


                            this.displaySuccessMessage("Your goal has been updated. <br> affectRows: " + this.tempData.data.affectRows);
                            // this.updateTeamMembers(editTeam,this.memberSelectedOptions);
                            this.objectiveNameInputBoxValue = "";
                            this.objectiveDescriptionInputBoxValue = "";
                            this.updateOverallNumbers();

                            var submitANewActivity= new Activityclass();

                            var modifyLog = " ";
                            if (originalObjective.objective_description !=editObjective.objective_description){
                                modifyLog=modifyLog+" Change Objective description  to"+ editObjective.objective_description+"; ";
                            }
                            if (originalObjective.objective_name!=editObjective.objective_name){
                                modifyLog=modifyLog+"Change Objective name to"+ editObjective.objective_name+"; ";
                            }
                            if (originalObjective.objective_status!=editObjective.objective_status){
                                modifyLog=modifyLog+"Change Objective tag to"+ editObjective.objective_status+"; ";
                            }

                            submitANewActivity.user_id=this.selfUserInfoData.user_id;
                            submitANewActivity.activity_detail = "Updated goal : "
                                + editObjective.goal_name+ " update log : "+modifyLog ;
                            submitANewActivity.activity_type="Update";
                            this.submitActivity(submitANewActivity);




                        }else {
                            //swal("Warning", this.tempData.errorMassage, "warning");
                            swal("Error!", this.tempData.errorMassage, "error");
                        }

                    }
                );


        }

        this.modal.close();

    }



    getAllGoals() {
        this._settingGoalService.getAll()
            .subscribe(
                data => this.tempData = data,
                error => this.errorMessage = <any>error,
                () => {
                    if (this.tempData.status == "success" && this.tempData.data) {
                        this.goals = <Goalclass[]> this.tempData.data;
                        this.setGoalsDropDownList(this.goals);
                        //this.goals.sort();
                    }
                }
            );
    }






    setGoalsDropDownList(goals: Goalclass[]){
        var tempArray=[];
        var i=0;
        for (i=0;i<goals.length;i++){
            if(goals[i].goal_status!='Complete'){
                var info={id: goals[i].goal_id.toString(), name:goals[i].goal_name};
                tempArray.push(info);
            }

        }

        this.goalsDropDownListOptions=tempArray;


    }










    createNewObjective(objectiveNameInput: string, objectiveDescription: string) { // now I start use 2-way binding to process this



        if (!objectiveNameInput || !objectiveDescription) {
            //alert("Do not leave any empty!");

            this.displayWarningMessage("Objective Name or Objective Description empty!");
            return;
        }
        else {


            console.log(this.selectedTag);
            var goalIds = this.selectedGoal;
            console.log(goalIds);
            var objectiveStatusTag = this.selectedTag[0].name;
            console.log(this.selectedTag[0].id);

            var newObjective = new Objectiveclass();

            newObjective.objective_name=objectiveNameInput;
            newObjective.objective_description=objectiveDescription;
            newObjective.objective_progress_status = 0;

            newObjective.objective_status=objectiveStatusTag;


            this._settingObjectiveService.addNewByObjective(newObjective ).subscribe(
                data => this.tempData = data,
                error => this.errorMessage = <any>error,
                () => {
                    if (this.tempData.status == "success" && this.tempData.data) {
                        var tempInfo = <Objectiveclass>this.tempData.data;
                        var tempArray=[];
                        tempArray.push(tempInfo);
                        var i=0;
                        for (i=0;i<this.goals.length;i++){
                            tempArray.push(this.goals[i]);
                        }
                        this.goals=tempArray;
                        this.updateOverallNumbers();
                        this.objectiveNameInputBoxValue = "";
                        this.objectiveDescriptionInputBoxValue = "";
                        var submitANewActivity= new Activityclass();
                        submitANewActivity.user_id=this.selfUserInfoData.user_id;
                        submitANewActivity.activity_detail = " Created a new Objective : " + tempInfo.objective_name;
                        submitANewActivity.activity_type="Create";
                        this.submitActivity(submitANewActivity);
                    } else {

                        this.displayErrorMessage(this.tempData.errorMassage);


                    }

                }
            );
        }

        this.modal.close();
    }



//Start a subscription
    getTotalObjectivesNumber(){
        this.overallObjectivesNumberSubscription = this._shareUserOkrinfoService._shareObjectivesNumber$.subscribe(data => this.totalObjectivesNumber = data);
        if (!this.totalObjectivesNumber) {
            this.totalObjectivesNumber = ' - ';
        }
    }

    getOverallProgressNumber(){
        this.overallProgressNumberSubscription = this._shareUserOkrinfoService._shareOverallProgressNumber$.subscribe(data => this.overallProgressNumber = data);
        if (!this.overallProgressNumber) {
            this.overallProgressNumber = ' - ';
        }
    }




    rollBackObjectiveKeyResults(){

        this.updateProgressModal.hide();
        // if(this.editKeyResult){
        // Find out the original value from backup group

        var rollbackKeyResult = this.teamkeyresults.find(keyResult => keyResult.result_id == this.editKeyResult.result_id );
        console.log('roll back key' + rollbackKeyResult.result_progress_status);
        var i = 0;
        var j = 0;


        for( i = 0; i < this.teamObjectives.length; i++){
            for(j=0; j<this.teamObjectives[i].keyResult_array.length;j++){
                if (this.teamObjectives[i].keyResult_array[j].result_id == rollbackKeyResult.result_id){

                    this.teamObjectives[i].keyResult_array[j].result_progress_status = rollbackKeyResult.result_progress_status;

                }
            }
        }



        // }


    }




    setTimeFrameDropDownList(timeframes: Timeframeclass[]) {
        var i = 0;
        var tempArray = [];
        //var NonInfo={id:"0", text:"None"};
        for (i = timeframes.length - 1; i > 0; i--) {
            var timeFrameName = timeframes[i].time_frame_description
                + "   --- (" + timeframes[i].time_frame_start +
                " To " + timeframes[i].time_frame_end + ")";
            // var tempInfo={id:teams[i].team_id, name:teams[i].team_name};
            var tempInfo1 = { id: timeframes[i].time_frame_id, text: timeFrameName };
            tempArray.push(tempInfo1);
        }
        // This way is working...
        this.timeFrameDropDownListOptions = tempArray;
    }

    setGoalDropDownList(goals: Goalclass[]) {
        var i = 0;
        var tempArray = [];

        //var NonInfo={id:"0", text:"None"};
        for (i = goals.length - 1; i > 0; i--) {
            var goalName = goals[i].goal_name;
            var goalId = goals[i].goal_id;

            var tempInfo1 = { id: goalId[i].time_frame_id, text: goalName };
            tempArray.push(tempInfo1);

        }
        // This way is working...
        this.goalsDropDownListOptions = tempArray;

    }


    calculateObjectivesProgress(){
        var i=0;
        var j=0;
        if(this.teamObjectives){
            for(i=0; i<this.teamObjectives.length; i++){

                var averageProgress=0;
                var currentResultProgress =0;

                if(this.teamObjectives[i].keyResult_array.length < 1){
                    this.teamObjectives[i].objective_progress_status = 0;
                }else {
                    for(j=0; j < this.teamObjectives[i].keyResult_array.length; j++){
                        currentResultProgress = currentResultProgress + Number(this.teamObjectives[i].keyResult_array[j].result_progress_status);

                    }
                    averageProgress=currentResultProgress/this.teamObjectives[i].keyResult_array.length;
                    this.teamObjectives[i].objective_progress_status = averageProgress;

                }

            }
        }
        this.updateOverAllNumbers();
    }

    updateOverAllNumbers() {
        var overAllProgressNumber=this.calculateOverallProgress();

        // this._shareTeamsOkrinfoService.setOverAllProgressSubject(overAllProgressNumber);
        // this._shareTeamsOkrinfoService.setObjectivesSubjectNumber(this.teamObjectives.length);

    }




//--------- After objective and key result process -------------------------
    calculateOverallProgress():number{
        var totalNumber =0;
        var i=0;
        for(i=0;i<this.personalObjectives.length;i++){
            totalNumber=totalNumber+ Number(this.personalObjectives[i].objective_progress_status);
        }
        for(i=0;i<this.teamObjectives.length;i++){
            totalNumber=totalNumber+ Number(this.teamObjectives[i].objective_progress_status);
        }
        var overallProgress=totalNumber/(this.personalObjectives.length + this.teamObjectives.length);
        return overallProgress;
    }



    updateOverallNumbers() {
        var overAllProgressNumber=this.calculateOverallProgress();
        console.log(overAllProgressNumber);
        this._shareUserOkrinfoService.setOverAllProgressSubject(overAllProgressNumber);

    }

    submitActivity(activity:any){
        this._okrActivitiesService.addNewByClass(activity).subscribe(
            data=>this.tempData=data,
            error=>this.errorMessage=<any>error,
            ()=>{
                if(this.tempData.data && this.tempData&& <Activityclass>this.tempData.data){
                    //swal("Success!", "Your goal has been created.", "success");
                    console.log("activity success");
                }
            }
        );
    }


    displayWarningMessage(warningMessage:string){
        swal("Warning", warningMessage, "warning");
    }
    displayErrorMessage(errorMessage:string){
        swal("Error!", errorMessage , "error");
    }

    displaySuccessMessage(successMessage:string){
        swal("Success!", successMessage, "success");
    }
















    //modal setting and control

    //Modal actions



    @ViewChild('childModal') public childModal: ModalDirective;

    @ViewChild('objectiveModal') public objectiveModal: ModalDirective;
    @ViewChild('keyResultModal') public keyResultModal: ModalDirective;
    @ViewChild('updateProgressModal') public updateProgressModal: ModalDirective;


    @ViewChild('modal')
    modal: ModalComponent;

    open() {
        this.modal.open();
    }









}
