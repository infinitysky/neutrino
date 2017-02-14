/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UsersInfoService } from './users-info.service';

describe('UsersInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersInfoService]
    });
  });

  it('should ...', inject([UsersInfoService], (service: UsersInfoService) => {
    expect(service).toBeTruthy();
  }));
});
