import { TestBed, inject } from '@angular/core/testing';

import { ShareUserOkrinfoService } from './share-user-okrinfo.service';

describe('ShareUserOkrinfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShareUserOkrinfoService]
    });
  });

  it('should ...', inject([ShareUserOkrinfoService], (service: ShareUserOkrinfoService) => {
    expect(service).toBeTruthy();
  }));
});
