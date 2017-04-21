/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SettingObjectiveService } from './okr-objective.service';

describe('SettingObjectiveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SettingObjectiveService]
    });
  });

  it('should ...', inject([SettingObjectiveService], (service: SettingObjectiveService) => {
    expect(service).toBeTruthy();
  }));
});
