import { TestBed, inject } from '@angular/core/testing';

import { ShareTeamsOkrinfoService } from './share-teams-okrinfo.service';

describe('ShareTeamsOkrinfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShareTeamsOkrinfoService]
    });
  });

  it('should ...', inject([ShareTeamsOkrinfoService], (service: ShareTeamsOkrinfoService) => {
    expect(service).toBeTruthy();
  }));
});
