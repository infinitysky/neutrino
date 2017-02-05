import { Component, OnInit } from '@angular/core';

import { TimeFrameSettingModalComponent }from './time-frame-setting-modal/time-frame-setting-modal.component';


@Component({
  selector: 'setting-content',
  templateUrl: './okr-setting-time-frame.component.html',
  styleUrls: ['./okr-setting-time-frame.component.css']
})
export class OkrSettingTimeFrameComponent implements OnInit {
  public pageTitle="OKRs Setting";
  public subPageTitle="Time Frame Setting";

  dateValue:Date;


  constructor() { }

  ngOnInit() {
  }

}
