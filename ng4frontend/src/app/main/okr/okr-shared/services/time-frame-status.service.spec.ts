/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TimeFrameStatusService } from './time-frame-status.service';

describe('TimeFrameStatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimeFrameStatusService]
    });
  });

  it('should ...', inject([TimeFrameStatusService], (service: TimeFrameStatusService) => {
    expect(service).toBeTruthy();
  }));
});
