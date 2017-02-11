/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UsersinfoService } from './usersinfo.service';

describe('UsersinfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersinfoService]
    });
  });

  it('should ...', inject([UsersinfoService], (service: UsersinfoService) => {
    expect(service).toBeTruthy();
  }));
});
