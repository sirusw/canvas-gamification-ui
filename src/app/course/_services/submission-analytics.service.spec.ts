import { TestBed } from '@angular/core/testing';

import { SubmissionAnalyticsService } from './submission-analytics.service';

describe('SubmissionService', () => {
    let service: SubmissionAnalyticsService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(SubmissionAnalyticsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
