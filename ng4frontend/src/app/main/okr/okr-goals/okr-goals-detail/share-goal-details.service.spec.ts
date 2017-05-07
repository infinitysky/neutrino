import { TestBed, inject } from '@angular/core/testing';

import { ShareGoalDetailsService } from './share-goal-details.service';

describe('ShareGoalDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShareGoalDetailsService]
    });
  });

  it('should ...', inject([ShareGoalDetailsService], (service: ShareGoalDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
