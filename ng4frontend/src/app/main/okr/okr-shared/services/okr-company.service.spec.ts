/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OkrCompanyService } from './okr-company.service';

describe('OkrCompanyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OkrCompanyService]
    });
  });

  it('should ...', inject([OkrCompanyService], (service: OkrCompanyService) => {
    expect(service).toBeTruthy();
  }));
});
