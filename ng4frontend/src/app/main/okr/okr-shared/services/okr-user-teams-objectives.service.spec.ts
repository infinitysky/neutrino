import { TestBed, inject } from '@angular/core/testing';

import { OkrUserTeamsObjectivesService } from './okr-user-teams-objectives.service';

describe('OkrUserTeamsObjectivesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OkrUserTeamsObjectivesService]
    });
  });

  it('should ...', inject([OkrUserTeamsObjectivesService], (service: OkrUserTeamsObjectivesService) => {
    expect(service).toBeTruthy();
  }));
});
