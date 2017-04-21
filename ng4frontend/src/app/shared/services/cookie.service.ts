import { Injectable } from '@angular/core';

import { Cookie } from 'ng2-cookies';
import { Timeframeclass } from '../classes/time-frame-class';
import { Userclass } from '../classes/user-class';

@Injectable()
export class CookieService {
    cookies: Object;
    keys: Array<string>;
    cName: string;
    cValue: string;
    rName: string;
    checkName: string;


  constructor() {
      this.update();
     // console.log(this.cookies);
  }
    update() {
        this.cookies = Cookie.getAll();
        this.keys = Object.keys(this.cookies);
    }
    addCookie(cName: string, cValue: string) {
    //    console.log('Adding: ', cName, cValue);
        Cookie.set(cName, cValue);
        this.update();
    }
    removeCookie(rName: string) {
   //     console.log('Removing: ', rName);
        Cookie.delete(rName);
        this.update();
    }

    getCookie(rName: string) :string {
        //     console.log('Removing: ', rName);
       let cookie = Cookie.get(rName);
        return cookie;
    }
    removeAll() {
      //  console.log('Removing all cookies');
        Cookie.deleteAll();
        this.update();
    }
    checkCookie() {
        console.log('Checking: ', this.checkName);
        console.log(Cookie.check(this.checkName));
       // window.alert('Check cookie ' + this.checkName + ' returned ' + Cookie.check(this.checkName));
    }


    //------------------------ Short Cut Functions---------------------------------------------------------------

    getCookieCurrentUser(): Userclass {
        //     console.log('Removing: ', rName);
        let currentUser = 'currentUser';
        let cookie = Cookie.get(currentUser);

        const userInfo = <Userclass> JSON.parse(cookie);
        return userInfo;
    }


    setCookieCurrentUser(currentUserInfo: string) {
        //     console.log('Removing: ', rName);
        const currentUser = 'currentUser';
        Cookie.set(currentUser, currentUserInfo);
        this.update();
    }

    getCookieCurrentTimeFrame(): Timeframeclass {
        //     console.log('Removing: ', rName);
        const currentTimeFrame = 'currentTimeFrame';
        let cookie = Cookie.get(currentTimeFrame);

        const timeFrame = <Timeframeclass> JSON.parse(cookie);
        return timeFrame;
    }


    setCookieCurrentTimeFrame(currentTimeFrameInfo: string) {
        //     console.log('Removing: ', rName);
        const currentTimeFrame = 'currentTimeFrame';
        Cookie.set(currentTimeFrame, currentTimeFrameInfo);
        this.update();
    }



}
