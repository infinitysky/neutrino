/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SettingKeyResultService } from './okr-key-result.service';

describe('SettingKeyResultService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SettingKeyResultService]
    });
  });

  it('should ...', inject([SettingKeyResultService], (service: SettingKeyResultService) => {
    expect(service).toBeTruthy();
  }));
});
