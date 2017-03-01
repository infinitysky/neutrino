import { TestBed, inject } from '@angular/core/testing';

import { TimeFrameStoreService } from './time-frame-store.service';

describe('TimeFrameStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimeFrameStoreService]
    });
  });

  it('should ...', inject([TimeFrameStoreService], (service: TimeFrameStoreService) => {
    expect(service).toBeTruthy();
  }));
});
