import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-okr-teams-detail',
  templateUrl: './okr-teams-detail.component.html',
  styleUrls: ['./okr-teams-detail.component.css']
})
export class OkrTeamsDetailComponent implements OnInit {

  constructor(private _activatedRoute:ActivatedRoute) {
    console.log()
  }

  ngOnInit() {
    console.log(this._activatedRoute.snapshot.params['id']);
  }

}
