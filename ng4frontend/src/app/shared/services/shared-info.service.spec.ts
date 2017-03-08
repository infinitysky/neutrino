import { TestBed, inject } from '@angular/core/testing';

import { SharedInfoService } from './shared-info.service';

describe('SharedInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedInfoService]
    });
  });

  it('should ...', inject([SharedInfoService], (service: SharedInfoService) => {
    expect(service).toBeTruthy();
  }));
});
