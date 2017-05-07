import { TestBed, inject } from '@angular/core/testing';

import { MyCookieService } from './my-cookie.service';

describe('MyCookieService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyCookieService]
    });
  });

  it('should ...', inject([MyCookieService], (service: MyCookieService) => {
    expect(service).toBeTruthy();
  }));
});
