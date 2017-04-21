/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserInfoContainerService } from './user-info-container.service';

describe('UserInfoContainerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserInfoContainerService]
    });
  });

  it('should ...', inject([UserInfoContainerService], (service: UserInfoContainerService) => {
    expect(service).toBeTruthy();
  }));
});
