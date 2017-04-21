import { TestBed, inject } from '@angular/core/testing';

import { UsersLoginInfoService } from './users-login-info.service';

describe('UsersLoginInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersLoginInfoService]
    });
  });

  it('should ...', inject([UsersLoginInfoService], (service: UsersLoginInfoService) => {
    expect(service).toBeTruthy();
  }));
});
