import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Router } from '@angular/router';

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



import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';



import { SelectModule } from 'ng2-select';

//import swal from 'sweetalert2'
declare var swal: any;



import { SettingGoalService } from '../../okr-shared/services/okr-goal.service';
import { Goalclass } from '../../okr-shared/classes/goal-class';
import { SettingTimeFrameService } from '../../okr-shared/services/okr-time-frame.service';
import { SettingTeamService } from '../../okr-shared/services/okr-team.service';
import { Timeframeclass } from '../../okr-shared/classes/time-frame-class';
import { Teamclass } from '../../okr-shared/classes/team-class';

import {Activityclass}from '../../okr-shared/classes/activitie-class';
import {OkrActivitiesService}from '../../okr-shared/services/okr-activities.service';
import {UserInfoContainerService} from '../../../shared/services/user-info-container.service';

import { ShareUserOkrinfoService } from '../share-user-okrinfo.service';
@Component({
  selector: 'app-okrs-users-okrs',
  templateUrl: './okrs-users-okrs.component.html',
  styleUrls: ['./okrs-users-okrs.component.css']
})
export class OkrsUsersOkrsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
