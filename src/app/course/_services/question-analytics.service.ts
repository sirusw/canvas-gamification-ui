import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ApiService} from "@app/_services/api.service";
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";
import {QuestionAnalytics} from "@app/_models/analytics";
import {PaginatedResult} from "@app/_models/paginatedResult";

@Injectable({
    providedIn: 'root'
})
export class QuestionAnalyticsService {

    constructor(private http: HttpClient,
        private apiService: ApiService) { }

    getQuestionMetrics(): Observable<QuestionAnalytics[]> {
        const url = this.apiService.getURL('submission-analytics');
        return this.http
            .get<QuestionAnalytics[]>(url)
            .pipe(catchError(this.apiService.handleError<QuestionAnalytics[]>(`Error occurred while fetching submission analytics`)));
    }


    getAllQuestionAnalytics(): Observable<QuestionAnalytics[]> {
        const url = this.apiService.getURL('question-analytics', 'question');

        return this.http
            .get<QuestionAnalytics[]>(url)
            .pipe(catchError(this.apiService.handleError<QuestionAnalytics[]>(`Error occurred while fetching question analytics`)));
    }

    getQuestionAnalyticsByQuestion(questionId: number): Observable<QuestionAnalytics> {
        const params = new HttpParams()
            .set('id', String(questionId));
        const url = this.apiService.getURL('question-analytics', 'question');
        return this.http
            .get<QuestionAnalytics>(url, {params})
            .pipe(catchError(this.apiService.handleError<QuestionAnalytics>(`Error Occurred while fetching user-specific data for this question analytics`)));
    }

    getQuestionAnalyticsByEvent(eventId: number): Observable<QuestionAnalytics[]> {
        const params = new HttpParams()
            .set('id', String(eventId));
        const url = this.apiService.getURL('question-analytics', 'event');
        return this.http
            .get<QuestionAnalytics[]>(url, {params})
            .pipe(catchError(this.apiService.handleError<QuestionAnalytics[]>(`Error Occurred while fetching user-specific data for this question analytics`)));
    }

}
