import { TestBed } from '@angular/core/testing';

import { DailyFeedService } from './daily-feed.service';

describe('DailyFeedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DailyFeedService = TestBed.get(DailyFeedService);
    expect(service).toBeTruthy();
  });
});
