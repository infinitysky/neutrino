import { Component, OnInit,ViewChild  } from '@angular/core';

import { Http,Response, Headers,RequestOptions } from '@angular/http';

import { Router }            from '@angular/router';

import 'rxjs';

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
// Observable class extensions
import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';




import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { SettingTimeFrameService} from './setting-time-frame.service';
import  {Timeframeclass} from './timeframeclass';



@Component({
  selector: 'setting-content',
  providers: [SettingTimeFrameService],
  templateUrl: './okr-setting-time-frame.component.html',
  styleUrls: ['./okr-setting-time-frame.component.css']
})
export class OkrSettingTimeFrameComponent implements OnInit {
  public pageTitle="OKRs Setting";
  public subPageTitle="Time Frame Setting";
  public timeFrames: Timeframeclass[]=[];
  public timeFramesData:any;
  public errorMessage:any;

  public isLoaded:boolean=true;
  constructor(private _settingTimeFrameService: SettingTimeFrameService,private router: Router) { }

  ngOnInit():void {
    this.getTimeFrames();

  }
  editButton(){
    this.isLoaded=!this.isLoaded;
  }


  editCurrentTimeFrames(){
    console.log("editCurrentStore");

  }



  getTimeFrames() {
    this._settingTimeFrameService.getAllTimeFrames()
      .subscribe(
        data => this.timeFrames = data,
        error =>  this.errorMessage = <any>error);
  }

/*
  getHeroes() {
    this.heroService.getHeroes()
      .subscribe(
        heroes => this.heroes = heroes,
        error =>  this.errorMessage = <any>error);
  }
  addHero (name: string) {
    if (!name) { return; }
    this.heroService.addHero(name)
      .subscribe(
        hero  => this.heroes.push(hero),
        error =>  this.errorMessage = <any>error);
  }
*/

}
