import { TestBed } from '@angular/core/testing';

import { EventAnalyticsService } from './event-analytics.service';
import {MOCK_EVENT_ANALYTICS} from "@app/problems/_test/mock";
import {HttpTestingController} from "@angular/common/http/testing";

describe('EventAnalyticsServiceService', () => {
    let eventAnalyticsService: EventAnalyticsService;
    let httpMock: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        eventAnalyticsService = TestBed.inject(EventAnalyticsService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(eventAnalyticsService).toBeTruthy();
    });

    it('should return the same event analytics', () =>{
        eventAnalyticsService.getEventAnalyticsByEvent(0).subscribe((eventAnalytics) => {
            expect(eventAnalytics.results[0]).toEqual(MOCK_EVENT_ANALYTICS);
        });
        const request = httpMock.expectOne('http://localhost:8000/api/event-analytics/?event=0');
        expect(request.request.method).toBe('GET');
        request.flush(MOCK_EVENT_ANALYTICS);
    });

    it('should return ok (length 2) for initializing event analytics'), ()=>{
        eventAnalyticsService.initEventAnalytics().subscribe((response)=>{
            expect(response.length).toBe(2);
        });
    };

});
