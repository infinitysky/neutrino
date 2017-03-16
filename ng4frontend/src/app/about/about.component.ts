import { Component, OnInit } from '@angular/core';

import {UserInfoContainerService}from '../shared/services/user-info-container.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private  _userInfoContainerService:UserInfoContainerService) {

  }

  ngOnInit() {

  }

}
