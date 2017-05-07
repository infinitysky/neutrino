import { Injectable } from '@angular/core';

// import { Cookie } from 'ng2-cookies';
import { Timeframeclass } from '../classes/time-frame-class';
import { Userclass } from '../classes/user-class';
import { CookieService } from 'ng2-cookies';
@Injectable()
export class MyCookieService {
  cookies: Object;
  keys: Array<string>;
  cName: string;
  cValue: string;
  rName: string;
  checkName: string;


  constructor(public _cookieService: CookieService) {
    this.update();
    console.log(this.cookies);
  }
  update() {
    this.cookies = this._cookieService.getAll();
    this.keys = Object.keys(this.cookies);
  }
  addCookie(cName: string, cValue: string) {
    console.log('Adding: ', cName, cValue);
    this._cookieService.set(cName, cValue);
    this.update();
  }
  removeCookie(rName: string) {
    console.log('Removing: ', rName);
    this._cookieService.delete(rName);
    this.update();
  }
  removeAll() {
    console.log('Removing all cookies');
    this._cookieService.deleteAll();
    this.update();
  }
  checkCookie() {
    console.log('Checking: ', this.checkName);
    console.log(this._cookieService.check(this.checkName));
   // window.alert('Check cookie ' + this.checkName + ' returned ' + this._cookieService.check(this.checkName));
    console.log('Check cookie ' + this.checkName + ' returned ' + this._cookieService.check(this.checkName));
  }





  getCookie(rName: string) :string {
    //     console.log('Removing: ', rName);
    let cookie = this._cookieService.get(rName);
    return cookie;
  }


  /*------------------------ Short Cut Functions---------------------------------------------------------------*/

  getCookieCurrentUser(): Userclass {

    let currentUser = 'currentUser';
    let cookie =  this._cookieService.get(currentUser);

    const userInfo = <Userclass> JSON.parse(cookie);
    return userInfo;
  }


  setCookieCurrentUser(currentUserInfo: string) {

    const currentUser = 'currentUser';
    this._cookieService.set(currentUser, currentUserInfo);
    this.update();
  }

  getCookieCurrentTimeFrame(): Timeframeclass {

    const currentTimeFrame = 'currentTimeFrame';
    let cookie =  this._cookieService.get(currentTimeFrame);

    const timeFrame = <Timeframeclass> JSON.parse(cookie);
    return timeFrame;
  }


  setCookieCurrentTimeFrame(currentTimeFrameInfo: string) {

    const currentTimeFrame = 'currentTimeFrame';
    this._cookieService.set(currentTimeFrame, currentTimeFrameInfo);
    this.update();
  }



}
