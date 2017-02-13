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

//import swal from 'sweetalert2'
declare var swal: any;


import {SettingKeyResultService} from '../../okr-shared/services/okr-key-result.service';
import {Keyresultclass} from '../../okr-shared/classes/key-restult-class';

@Component({
  selector: 'app-okr-setting-key-result',
  templateUrl: './okr-setting-key-result.component.html',
   providers: [SettingKeyResultService],
  styleUrls: ['./okr-setting-key-result.component.css']
})
export class OkrSettingKeyResultComponent implements OnInit {


  public keyResults:Keyresultclass[];

  public pageTitle="OKRs Setting";
  public subPageTitle="KeyResult Setting";


  public KeyResultsData:any;
  public errorMessage:any;

  public isLoaded:boolean=true;
  selectedKeyResult: Keyresultclass;

  public tempData:any;

  animation: boolean = true;
  keyboard: boolean = true;
  backdrop: string | boolean = true;
  editModeIO:number;

  editKeyResult:string;
  keyResultNameInputBoxValue:string;
  keyResultDescriptionInputBoxValue:string;

   constructor(private _settingKeyResultService: SettingKeyResultService){


    this.keyResults=[];
    this.editModeIO=0;
    this.editKeyResult=null;
    this.keyResultNameInputBoxValue='';
    this.keyResultDescriptionInputBoxValue='';



    }

  editButton(){
    this.isLoaded=!this.isLoaded;
  }
  refreshButton(){
    this.getAllKeyResults();
  }
  addKeyResultButton(){


    this.editModeIO=0;
    this.modal.open();
  }

  deleteKeyResultButton(KeyResult) {
    //this.showAlert();
    this._settingKeyResultService
      .delete(KeyResult)
      .subscribe(
        data =>{this.tempData=data},
        error => {this.errorMessage = <any>error},
        ()=>{


          if(this.tempData.affectRows>0){
            swal("Deleted!", "Your key result has been deleted.", "success");
            this.keyResults = this.keyResults.filter(currentKeyResults => currentKeyResults !== KeyResult);

          }else{
            swal("Error!", "Your key result did not been deleted successfully.", "error");
          }
        }
      );
  }


  modalSaveChangeButton(KeyResultNameInput:string,KeyResultDescription:string){
    if(0==this.editModeIO){
      this.createNewKeyResult(KeyResultNameInput);
    }else {
      this.updateKeyResult( this.editKeyResult,KeyResultNameInput);
    }
  }


  editKeyResultsButton(KeyResult){
    this.editModeIO=1;
    this.editKeyResult=KeyResult;
    this.keyResultNameInputBoxValue=KeyResult.KeyResult_name;
    this.keyResultDescriptionInputBoxValue=KeyResult.KeyResult_description;


    this.modal.open();

  }


//TODO: Fix the date format handling issue.
  updateKeyResult(editKeyResult,KeyResultNameInput:string) {



    if (!KeyResultNameInput  ) {
      //alert("Do not leave any empty!");
     // swal("Warning", "you did not change any time!", "warning");

      return;
    }



    this._settingKeyResultService.update(editKeyResult)
      .subscribe(
        data  => {this.tempData = data},
        error =>  this.errorMessage = <any>error,
        ()=>{


          if(this.tempData.affectRows>0){
            swal("Success!", "Your key result has been updated.", "success");

          }else{
            swal("Error!", "Your key result did not been deleted successfully.", "error");
          }

        }
      );
    this.modal.close();





  }




  getAllKeyResults() {

    this._settingKeyResultService.getAll()
      .subscribe(
        data => this.KeyResultsData = data,
        error =>  this.errorMessage = <any>error,
        ()=>{



          this.keyResults=this.KeyResultsData;
        }
      );

  }





  createNewKeyResult (KeyResultNameInput:string) {
    if (!KeyResultNameInput  ) {
      //alert("Do not leave any empty!");
      swal("Warning", "Do not leave any empty!", "warning");
      return;
    }

    this.modal.close();
  }


 //warning functions
//this function is not a native angular 2 function, it was implemented by third-party javascript library!









  //ng2 liftcycle functions

  onSelect(keyResult: Keyresultclass ): void {
    this.selectedKeyResult = keyResult;
  }

  //component functions
  ngOnInit() {

    this.getAllKeyResults();
  }






  //modal setting and control


  //Modal actions
  @ViewChild('modal')
  modal: ModalComponent;


  closed() {
    this.keyResultDescriptionInputBoxValue= "";
    this.keyResultNameInputBoxValue= "";


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
