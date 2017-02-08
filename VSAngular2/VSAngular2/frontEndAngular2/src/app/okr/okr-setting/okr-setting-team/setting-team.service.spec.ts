/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SettingTeamService } from './setting-team.service';

describe('SettingTeamService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SettingTeamService]
    });
  });

  it('should ...', inject([SettingTeamService], (service: SettingTeamService) => {
    expect(service).toBeTruthy();
  }));
});
