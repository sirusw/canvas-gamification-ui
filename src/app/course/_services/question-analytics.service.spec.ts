import { TestBed } from '@angular/core/testing';

import { QuestionAnalyticsService } from './question-analytics.service';

describe('QuestionAnalyticsService', () => {
  let service: QuestionAnalyticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionAnalyticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
