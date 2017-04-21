import { TestBed, inject } from '@angular/core/testing';

import { OkrActivitiesService } from './okr-activities.service';

describe('OkrActivitiesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OkrActivitiesService]
    });
  });

  it('should ...', inject([OkrActivitiesService], (service: OkrActivitiesService) => {
    expect(service).toBeTruthy();
  }));
});
