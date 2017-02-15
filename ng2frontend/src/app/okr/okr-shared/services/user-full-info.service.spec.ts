/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserFullInfoService } from './user-full-info.service';

describe('UserFullInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserFullInfoService]
    });
  });

  it('should ...', inject([UserFullInfoService], (service: UserFullInfoService) => {
    expect(service).toBeTruthy();
  }));
});
