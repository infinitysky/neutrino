import { TestBed, inject } from '@angular/core/testing';

import { ShareCompanyOkrinfoService } from './share-company-okrinfo.service';

describe('ShareCompanyOkrinfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShareCompanyOkrinfoService]
    });
  });

  it('should ...', inject([ShareCompanyOkrinfoService], (service: ShareCompanyOkrinfoService) => {
    expect(service).toBeTruthy();
  }));
});
