import { TestBed } from '@angular/core/testing';

import { QuestionAnalyticsService } from './question-analytics.service';
import {
    MOCK_QUESTION_ANALYTICS,
    MOCK_QUESTION_ANALYTICS_2, MOCK_QUESTION_ANALYTICS_3,
    MOCK_QUESTION_ANALYTICSS
} from "@app/problems/_test/mock";
import {HttpTestingController} from "@angular/common/http/testing";

describe('QuestionAnalyticsService', () => {
    let questionAnalyticsService: QuestionAnalyticsService;
    let httpMock: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        questionAnalyticsService = TestBed.inject(QuestionAnalyticsService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(questionAnalyticsService).toBeTruthy();
    });

    it('should return all question analytics'), () =>{
        questionAnalyticsService.getAllQuestionAnalytics().subscribe((questionAnalytics) => {
            expect(questionAnalytics.results).toEqual(MOCK_QUESTION_ANALYTICSS);
        });
        const request = httpMock.expectOne('http://localhost:8000/api/question-analytics');
        expect(request.request.method).toBe('GET');
        request.flush(MOCK_QUESTION_ANALYTICS);
    };

    it('should return a mcq question analytics'), () =>{
        questionAnalyticsService.getMCQQuestionAnalyticsByQuestion(0).subscribe(questionAnalytics =>{
            expect(questionAnalytics[0]).toBe(MOCK_QUESTION_ANALYTICS);
        });
        const request = httpMock.expectOne('http://localhost:8000/api/mcq-question-analytics/?question=0');
        expect(request.request.method).toBe('GET');
        request.flush(MOCK_QUESTION_ANALYTICS);
    };

    it('should return a java question analytics'), () =>{
        questionAnalyticsService.getJavaQuestionAnalyticsByQuestion(1).subscribe(questionAnalytics =>{
            expect(questionAnalytics[0]).toBe(MOCK_QUESTION_ANALYTICS_2);
        });
        const request = httpMock.expectOne('http://localhost:8000/api/java-question-analytics/?question=1');
        expect(request.request.method).toBe('GET');
        request.flush(MOCK_QUESTION_ANALYTICS_2);
    };

    it('should return a mcq question analytics'), () =>{
        questionAnalyticsService.getParsonsQuestionAnalyticsByQuestion(2).subscribe(questionAnalytics =>{
            expect(questionAnalytics[0]).toBe(MOCK_QUESTION_ANALYTICS_3);
        });
        const request = httpMock.expectOne('http://localhost:8000/api/parsons-question-analytics/?question=2');
        expect(request.request.method).toBe('GET');
        request.flush(MOCK_QUESTION_ANALYTICS_3);
    };

    it('should return ok (length 2) for initializing question analytics'), ()=>{
        questionAnalyticsService.initQuestionAnalytics().subscribe((response)=>{
            expect(response.length).toBe(2);
        });
    };

});
