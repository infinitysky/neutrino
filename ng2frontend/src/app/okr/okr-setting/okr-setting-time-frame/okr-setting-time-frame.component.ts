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
import {IMyOptions, IMyDateRangeModel, IMyDateRange, IMyInputFieldChanged, IMyCalendarViewChanged} from 'mydaterangepicker';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

//import swal from 'sweetalert2'
declare var swal: any;

import { SettingTimeFrameService} from '../../okr-shared/services/okr-time-frame.service';

import {Timeframeclass} from '../../okr-shared/classes/time-frame-class';

import {OkrSettingNavigationComponent} from '../okr-setting-shared/okr-setting-navigation/okr-setting-navigation.component'



@Component({
  selector: 'setting-content',
  providers: [SettingTimeFrameService],
  templateUrl: './okr-setting-time-frame.component.html',
  styleUrls: ['./okr-setting-time-frame.component.css']
})
export class OkrSettingTimeFrameComponent implements OnInit {
  public pageTitle="OKRs Setting";
  public subPageTitle="Time Frame Setting";

  public timeFrames : Timeframeclass[];

  public timeFramesData:any;
  public errorMessage:any;

  public isLoaded:boolean=true;
  selectedHero: Timeframeclass;

  //datepicker configration
  startDateInEpoch:any;
  endDateInEpoch:any;
  startDateInDate:any;
  endDateInDate:any;

  public pushData:any;
  public databases;
   public tempData:any;

  animation: boolean = true;
  keyboard: boolean = true;
  backdrop: string | boolean = true;

  editDateRangeNormal:string=null;
  public checkFlag:number=0;


  public editTimeFrame:any;

  rangeTextPlaceholder:string="Please select your range";
  edit_startDate:Date;
  edit_EndDate:Date;
  //edit_dateRange:string="";

  edit_dateRange:string= null;

  editModeIO:number=0;//this is for check edit Mode on or off.
  timeFrameNameInputBoxValue:string="";
  public AfterUpdateData:any;




  constructor(private _settingTimeFrameService: SettingTimeFrameService,
              private router: Router,
              private toastyService:ToastyService, private toastyConfig: ToastyConfig
   ) {

    console.log('constructor(): SampleDateRangePickerNormal');
    this.timeFrames=[];
    this.edit_startDate = new Date();
    this.edit_EndDate = new Date();
    this.editModeIO=0;
    this.editTimeFrame=null;

    }

  editButton(){
    this.isLoaded=!this.isLoaded;
  }
  refreshButton(){
    this.getTimeFrames();
  }
  addTimeFrameButton(){

    this.timeFrameNameInputBoxValue= "";
    this.edit_dateRange=null;
    this.edit_startDate=null;
    this.edit_EndDate=null;
    this.editModeIO=0;
    this.modal.open();
  }

  deleteTimeFrameButton(timeFrame) {
    //this.showAlert();
    this._settingTimeFrameService
      .deleteTheTimeFrame(timeFrame)
      .subscribe(
        data =>{this.tempData=data},
        error => {this.errorMessage = <any>error},
        ()=>{
          console.log(this.tempData);
          if(this.tempData.data.affectRows>0){
            swal("Deleted!", "Your time frame has been deleted.", "success");
            this.timeFrames = this.timeFrames.filter(currentTimeFrames => currentTimeFrames !== timeFrame);

          }else{
            swal("Error!", "Your time frame did not been deleted successfully.", "error");
          }
        }
      );
  }


  modalSaveChangeButton(timeFrameNameInput:string){
    if(0==this.editModeIO){
      this.createNewTimeFrame(timeFrameNameInput);
    }else {
      this.updateTimeFrame( this.editTimeFrame,timeFrameNameInput);
    }
  }


  editTimeFramesButton(timeFrame){
    this.editModeIO=1;
    this.editTimeFrame=timeFrame;
    this.timeFrameNameInputBoxValue=timeFrame.time_frame_description;

    this.edit_dateRange=timeFrame.time_frame_start+' - '+timeFrame.time_frame_end;
    this.edit_startDate=timeFrame.time_frame_start;
    this.edit_EndDate=timeFrame.time_frame_end;
    // var displayStartDate:Date= new Date(timeFrame.time_frame_start);
    // var displayEndDate:Date= new Date(timeFrame.time_frame_end);
    // this.edit_dateRange={beginDate: {year: displayStartDate.getFullYear(), month: displayStartDate.getMonth(), day: 1},
    //   endDate: {year: 2017, month: 1, day: 1}};

    this.startDateInDate=timeFrame.time_frame_start;
    this.endDateInDate=timeFrame.time_frame_end;




    this.modal.open();

  }


//TODO: Fix the date format handling issue.
  updateTimeFrame(editTimeFrame,timeFrameNameInput:string) {
    console.log(editTimeFrame);

    if (!timeFrameNameInput || !this.startDateInEpoch ||!this.endDateInEpoch ) {
      //alert("Do not leave any empty!");
      //swal("Warning", "Do not leave any empty!", "warning");
      this.showUnChangedInfoToast();
      return;
    }


    let tempTimeFrame=editTimeFrame;
    tempTimeFrame.time_frame_description=timeFrameNameInput;
    tempTimeFrame.time_frame_start =this.startDateInEpoch;
    tempTimeFrame.time_frame_end=this.endDateInEpoch;

    var NewStartDate:Date= new Date(this.startDateInEpoch);
    var NewEndDate:Date= new Date(this.endDateInEpoch);

    console.log(NewStartDate.toLocaleDateString());
    console.log(NewEndDate.toLocaleDateString());


    console.log("editTimeFrame: "+ JSON.stringify(editTimeFrame));
    this._settingTimeFrameService.update(tempTimeFrame)
      .subscribe(
        data  => {this.tempData = data},
        error =>  this.errorMessage = <any>error,
        ()=>{
          console.log( "Updat this.tempData + "+JSON.stringify(this.tempData.data));
          //this.childtimeFrames=this.tempData;
          console.log(this.tempData.data);
          if(this.tempData.data.affectRows>0){
            swal("Success!", "Your time frame has been updated.", "success");
           // this.timeFrames = this.timeFrames.filter(currentTimeFrames => currentTimeFrames !== timeFrame);
            editTimeFrame.time_frame_description=timeFrameNameInput;
            editTimeFrame.time_frame_start =NewStartDate;
            editTimeFrame.time_frame_end=NewEndDate;


            // editTimeFrame.time_frame_start =this.startDateInDate;
            // editTimeFrame.time_frame_end=this.endDateInDate;
            //this.getTimeFrameByID(editTimeFrame);

          }else{
            swal("Error!", "Your time frame did not been deleted successfully.", "error");
          }
         // this.timeFrames.push(this.tempData);

        }
      );
    this.modal.close();

  }



  getTimeFrameByID(timeFrame:Timeframeclass){
    this._settingTimeFrameService.getById(timeFrame.time_frame_id).subscribe(
      data=>this.tempData=data,
      error=>this.errorMessage=<any>error,
      ()=>{
        this.editTimeFrame=this.tempData.data;
        console.log('timeframe: ' + JSON.stringify(this.editTimeFrame));
       // timeFrame=this.tempData.data;
      }
    );

  }



  getTimeFrames() {
    this._settingTimeFrameService.getAllTimeFrames()
      .subscribe(
        data => this.timeFramesData = data,
        error =>  this.errorMessage = <any>error,
        ()=>{
          //console.log( "this.timeFramesData + "+JSON.stringify(this.timeFramesData));
          this.timeFrames=this.timeFramesData.data;
        }
      );

  }





  createNewTimeFrame (timeFrameNameInput:string) {
    if (!timeFrameNameInput || !this.startDateInEpoch ||!this.endDateInEpoch ) {
      //alert("Do not leave any empty!");
      swal("Warning", "Do not leave any empty!", "warning");
      return;
    }
   // console.log("timeFrameName: "+ timeFrameNameInput +"this.startDate" + this.startDate + "this.endDate ： " + this.endDate);
    this._settingTimeFrameService.addNewTimeFrame(timeFrameNameInput, this.startDateInEpoch, this.endDateInEpoch)
      .subscribe(
        data  => {this.tempData = data},
        error =>  this.errorMessage = <any>error,
        ()=>{
          console.log( "this.tempData + "+JSON.stringify(this.tempData.data));
          //this.childtimeFrames=this.tempData;

          //TODO: Fix the error handle issue when the system fail to create new time frame.
          if(!this.tempData.data){
            console.log(this.tempData.data);
            swal({
              title: "Error!",
              text: "Your time frame has not created successfully.!",
              type: "error"
            });

          }else{
           // swal("Error!", "Your time frame not been deleted successfully.", "error");
            this.timeFrames.push(this.tempData.data);
            swal({
              title: "Success!",
              text: "The New Record has been add into the system!",
              type: "success"
            });


          }

        }
      );
    this.modal.close();
  }


 //warning functions
//this function is not a native angular 2 function, it was implemented by third-party javascript library!









  //ng2 liftcycle functions

  onSelect(timeFrame: Timeframeclass ): void {
    this.selectedHero = timeFrame;
  }

  //component functions
  ngOnInit() {
    console.log('onInit(): SampleDateRangePickerNormal');
    this.getTimeFrames();
  }

  onInputFieldChanged(event: IMyInputFieldChanged) {
    console.log('onInputFieldChanged(): Value: ', event.value, ' - dateRangeFormat: ', event.dateRangeFormat, ' - valid: ', event.valid);
  }

  onCalendarViewChanged(event: IMyCalendarViewChanged) {
    console.log('onCalendarViewChanged(): Year: ', event.year, ' - month: ', event.month, ' - first: ', event.first, ' - last: ', event.last);
  }














  //calendar setting and functions


  private myDateRangePickerOptionsNormal: IMyOptions = {
    clearBtnTxt: 'Clear',
    beginDateBtnTxt: 'Begin Date',
    endDateBtnTxt: 'End Date',
    acceptBtnTxt: 'Apply',
    dateFormat: 'dd-mm-yyyy',
    firstDayOfWeek: 'mo',
    sunHighlight: true,
    height: '34px',
    width: '50%',
    inline: false,
    alignSelectorRight: false,
    indicateInvalidDateRange: true,
    minYear: 2000,
    maxYear: 2099,
    componentDisabled: false,
    markCurrentDay:true,
    showClearDateRangeBtn: true,
    showSelectorArrow: true
  };

  //selectedDateRangeNormal:string = '04 Nov 2016 - 26 Nov 2016';
  selectedDateRangeNormal:IMyDateRange = {beginDate: {year: 2017, month: 1, day: 1}, endDate: {year: 2017, month: 1, day: 1}};

  selectedTextNormal: string = '';
  border: string = 'none';

  placeholderTxt: string = '';



  clearDateRange() {
    this.selectedDateRangeNormal = null;
  }

  onDisableComponent(checked: boolean) {
    let copy = this.getCopyOfOptions();
    copy.componentDisabled = checked;
    this.myDateRangePickerOptionsNormal = copy;
  }

  onEditableDateField(checked: boolean) {
    let copy = this.getCopyOfOptions();
    copy.editableDateRangeField = checked;
    this.myDateRangePickerOptionsNormal = copy;
  }

  onAlignSelectorRight(checked: boolean) {
    let copy = this.getCopyOfOptions();
    copy.alignSelectorRight = checked;
    this.myDateRangePickerOptionsNormal = copy;
  }

  onShowClearButton(checked: boolean) {
    let copy = this.getCopyOfOptions();
    copy.showClearDateRangeBtn = checked;
    this.myDateRangePickerOptionsNormal = copy;
  }

  onShowPlaceholderText(checked: boolean) {
    this.placeholderTxt = checked ? 'Select a date range' : '';
  }



  onDateRangeChanged(event: IMyDateRangeModel) {
    console.log('onDateRangeChanged(): Begin: ', event.beginDate, ' - beginJsDate: ', new Date(event.beginJsDate).toLocaleDateString(), ' - End: ', event.endDate, ' - endJsDate: ', new Date(event.endJsDate).toLocaleDateString(), ' - formatted: ', event.formatted, ' - beginEpoc timestamp: ', event.beginEpoc, ' - endEpoc timestamp: ', event.endEpoc);
    if(event.formatted !== '') {
      this.selectedTextNormal = 'Formatted: ' + event.formatted;
      this.border = '1px solid #CCC';

      this.selectedDateRangeNormal = {beginDate: event.beginDate, endDate: event.endDate};
      this.startDateInEpoch=event.beginEpoc;
      this.endDateInEpoch=event.endEpoc;
      this.startDateInDate=event.beginDate;
      this.endDateInDate=event.endDate;

      console.log("this.startDate "+ this.startDateInDate + " this.endDate " +this.endDateInDate );
    }
    else {
      this.selectedTextNormal = '';
      this.border = 'none';
    }
  }



  ngOnDestroy() {
    // prevent memory leak when component destroyed

  }



  getCopyOfOptions(): IMyOptions {
    return JSON.parse(JSON.stringify(this.myDateRangePickerOptionsNormal));
  }






  //Modal actions
  @ViewChild('modal')
  modal: ModalComponent;


  closed() {
    this.timeFrameNameInputBoxValue= "";
    this.edit_dateRange="";
    this.edit_startDate=null;
    this.edit_EndDate=null;
    this.modal.close();
  }

  dismissed() {

  }

  opened() {


  }

  navigate() {

  }

  open() {
    this.timeFrameNameInputBoxValue= "";
    this.edit_dateRange="";
    this.edit_startDate=null;
    this.edit_EndDate=null;
    this.modal.open();
  }





  // major functions
  submitInfo(){


  }


  cleanData(){

  }


  alertMessage(message:string){
    alert(message);

  }
  closeModal(){

  }


  //toast info
  showUnChangedInfoToast() {
    // Just add default Toast with title only
    this.toastyService.default('Hi there');
    // Or create the instance of ToastOptions
    var toastOptions:ToastOptions = {
      title: "Warning",
      msg: "You did not change any thing",
      showClose: true,
      timeout: 5000,
      theme: 'default',
      onAdd: (toast:ToastData) => {
        console.log('Toast ' + toast.id + ' has been added!');
      },
      onRemove: function(toast:ToastData) {
        console.log('Toast ' + toast.id + ' has been removed!');
      }
    };
    // Add see all possible types in one shot
    //this.toastyService.info(toastOptions);
    //this.toastyService.success(toastOptions);
    this.toastyService.wait(toastOptions);
   // this.toastyService.error(toastOptions);
    //this.toastyService.warning(toastOptions);
  }


  /*
   add(name: string): void {
   name = name.trim();
   if (!name) { return; }
   this.heroService.create(name)
   .then(hero => {
   this.heroes.push(hero);
   this.selectedHero = null;
   });
   }
   */


}
