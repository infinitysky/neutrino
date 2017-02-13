/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GlobalUserInfoService } from './global-user-info.service';

describe('GlobalUserInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlobalUserInfoService]
    });
  });

  it('should ...', inject([GlobalUserInfoService], (service: GlobalUserInfoService) => {
    expect(service).toBeTruthy();
  }));
});
