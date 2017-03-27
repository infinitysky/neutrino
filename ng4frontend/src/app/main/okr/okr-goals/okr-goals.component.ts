import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';


import { SettingTeamService } from '../okr-shared/services/okr-team.service';

import { Goalclass } from '../okr-shared/classes/goal-class';


import { SettingGoalService } from '../okr-shared/services/okr-goal.service';

import { Userclass } from '../../../shared/classes/user-class';



@Component({
  selector: 'app-okr-goals',
  templateUrl: './okr-goals.component.html',
  providers: [SettingGoalService],
  styleUrls: ['./okr-goals.component.css']
})
export class OkrGoalsComponent implements OnInit {


    constructor(private _settingGoalService: SettingGoalService) { }

  ngOnInit() {
  }

  getAllGoals() {



  }


}
