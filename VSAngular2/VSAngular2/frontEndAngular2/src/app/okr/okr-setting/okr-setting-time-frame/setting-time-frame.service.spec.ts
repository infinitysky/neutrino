/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SettingTimeFrameService } from './setting-time-frame.service';

describe('SettingTimeFrameService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SettingTimeFrameService]
    });
  });

  it('should ...', inject([SettingTimeFrameService], (service: SettingTimeFrameService) => {
    expect(service).toBeTruthy();
  }));
});
