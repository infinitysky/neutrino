import { Injectable } from '@angular/core';

declare var swal: any;
//const swal = require('sweetalert');

@Injectable()
export class AlertService {

  constructor() {

  }


  displayWarningMessage(warningMessage:string){
    swal('Warning', warningMessage, 'warning');
  }
  displayErrorMessage(errorMessage:string){
    swal('Error!', errorMessage , 'error');
  }

  displaySuccessMessage(successMessage:string){
    swal('Success!', successMessage, 'success');
  }



}
