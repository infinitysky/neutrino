import { Injectable } from '@angular/core';



@Injectable()
export class UserInfoService {
  private user_id;

  constructor() {}

  setValue(val) {
    this.user_id = val;
  }

  getValue() {
    return this.user_id;
  }
}

