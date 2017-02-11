/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SettingGoalService } from './setting-goal.service';

describe('SettingGoalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SettingGoalService]
    });
  });

  it('should ...', inject([SettingGoalService], (service: SettingGoalService) => {
    expect(service).toBeTruthy();
  }));
});
