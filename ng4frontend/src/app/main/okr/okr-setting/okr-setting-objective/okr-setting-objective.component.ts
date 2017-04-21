import { Component, OnInit,ViewChild, Input } from '@angular/core';

import { Http,Response, Headers,RequestOptions } from '@angular/http';

import { Router } from '@angular/router';

import 'rxjs';

import { Observable }  from 'rxjs/Observable';
import { Subject }  from 'rxjs/Subject';
// Observable class extensions
import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';


import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';

import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

declare var swal: any;



import {  SettingObjectiveService } from '../../okr-shared/services/okr-objective.service';
import {Objectiveclass} from '../../okr-shared/classes/objective-class';

@Component({
    selector: 'app-okr-setting-objective',
    templateUrl: './okr-setting-objective.component.html',


    providers: [SettingObjectiveService],
    styleUrls: ['./okr-setting-objective.component.css']
})
export class OkrSettingObjectiveComponent implements OnInit {


    public Objectives: Objectiveclass[];


    public pageTitle = 'OKRs Setting';
    public subPageTitle = 'Objective Setting';



    public ObjectivesData:any;
    public errorMessage:any;

    public isLoaded:boolean=true;
    selectedObjective: Objectiveclass;

    public tempData:any;


    animation: boolean = true;
    keyboard: boolean = true;
    backdrop: string | boolean = "static";

    public editObjective:any;


    edit_startDate:Date;
    edit_EndDate:Date;
    edit_dateRange:string="";
    editModeIO:number=0;//this is for check edit Mode on or off.
    ObjectiveNameInputBoxValue:string="Please enter the Objective name";
    ObjectiveDescriptionInputBoxValue:string="Please enter the Objective description";






    //goals dropdown list

    //


    constructor(private _settingObjectiveService: SettingObjectiveService){


        this.Objectives=[];
        this.edit_startDate = new Date();
        this.edit_EndDate = new Date();
        this.editModeIO=0;
        this.editObjective=null;



    }

    editButton(){
        this.isLoaded=!this.isLoaded;
    }
    refreshButton(){
        this.getObjectives();
    }
    addObjectiveButton(){

        this.ObjectiveNameInputBoxValue="Please enter the Objective name";
        this.ObjectiveDescriptionInputBoxValue="Please enter the Objective description";

        this.editModeIO=0;
        this.modal.open();
    }

    deleteObjectiveButton(Objective) {
        //this.showAlert();
        this._settingObjectiveService
            .delete(Objective)
            .subscribe(
                data =>{this.tempData=data},
                error => {this.errorMessage = <any>error},
                ()=>{


                    if(this.tempData.data.affectRows>0){
                        swal("Deleted!", "Your time frame has been deleted.", "success");
                        this.Objectives = this.Objectives.filter(currentObjectives => currentObjectives !== Objective);

                    }else{
                        swal("Error!", "Your time frame did not been deleted successfully.", "error");
                    }
                }
            );
    }


    modalSaveChangeButton(ObjectiveNameInput:string,ObjectiveDescription:string){
        if(0==this.editModeIO){
            this.createNew(ObjectiveNameInput);
        }else {
            this.updateObjective( this.editObjective,ObjectiveNameInput);
        }
    }


    editObjectiveButton(Objective){
        this.editModeIO=1;
        this.editObjective=Objective;
        this.ObjectiveNameInputBoxValue=Objective.Objective_name;
        this.ObjectiveDescriptionInputBoxValue=Objective.Objective_description;




        this.modal.open();

    }



    updateObjective(editObjective,ObjectiveNameInput:string) {

        if (!ObjectiveNameInput  ) {
            //alert("Do not leave any empty!");
            // swal("Warning", "you did not change any time!", "warning");

            return;
        }else{
            this._settingObjectiveService.update(editObjective)
                .subscribe(
                    data  => {this.tempData = data},
                    error =>  this.errorMessage = <any>error,
                    ()=>{

                        if(this.tempData.affectRows>0){
                            swal("Success!", "Your time frame has been updated.", "success");

                        }else{
                            swal("Error!", "Your time frame did not been deleted successfully.", "error");
                        }

                    }
                );

        }


        this.modal.close();

    }




    getObjectives() {
        this._settingObjectiveService.getAll()
            .subscribe(
                data => this.ObjectivesData = data,
                error =>  this.errorMessage = <any>error,
                ()=>{
                    this.Objectives=<Objectiveclass[]>this.ObjectivesData.data;
                }
            );

    }





    createNew (ObjectiveNameInput:string) {
        if (!ObjectiveNameInput  ) {
            //alert("Do not leave any empty!");
            swal("Warning", "Do not leave any empty!", "warning");
            return;
        }

        this.modal.close();
    }


    //warning functions
//this function is not a native angular 2 function, it was implemented by third-party javascript library!









    //ng2 liftcycle functions

    onSelect(Objective: Objectiveclass ): void {
        this.selectedObjective = Objective;
    }

    //component functions
    ngOnInit() {

        this.getObjectives();
    }






    //modal setting and control


    //Modal actions
    @ViewChild('modal')
    modal: ModalComponent;


    closed() {
        this.ObjectiveNameInputBoxValue= "";
        this.ObjectiveDescriptionInputBoxValue= "";


        this.modal.close();
    }

    dismissed() {

    }

    opened() {


    }

    navigate() {

    }

    open() {

        this.modal.open();
    }



    // major functions
    submitInfo(){

    }

    cleanData(){

    }

    closeModal(){

    }





}
