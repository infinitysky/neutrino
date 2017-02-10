/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GraphDataService } from './graph-data.service';

describe('GraphDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GraphDataService]
    });
  });

  it('should ...', inject([GraphDataService], (service: GraphDataService) => {
    expect(service).toBeTruthy();
  }));
});
