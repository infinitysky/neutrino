import { TestBed, inject } from '@angular/core/testing';

import { UserInforStoreService } from './user-infor-store.service';

describe('UserInforStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserInforStoreService]
    });
  });

  it('should ...', inject([UserInforStoreService], (service: UserInforStoreService) => {
    expect(service).toBeTruthy();
  }));
});
