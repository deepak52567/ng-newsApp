import { TestBed } from '@angular/core/testing';

import { TopNewsService } from './top-news.service';

describe('TopNewsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TopNewsService = TestBed.get(TopNewsService);
    expect(service).toBeTruthy();
  });
});
