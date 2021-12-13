import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ApiService} from "@app/_services/api.service";
import {Observable} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {QuestionAnalytics} from "@app/_models/submission_analytics";
import {PaginatedResult} from "@app/_models/paginatedResult";
import {environment} from "@environments/environment";

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


    getAllQuestionAnalytics(options?: {
        filters?: unknown,
        ordering?: unknown,
        page?: number,
        pageSize?: number,
        recent?: boolean
    }): Observable<PaginatedResult<QuestionAnalytics>> {
        const url = this.apiService.getURL('question-analytics');
        const {filters = {}, page = 1, pageSize = 50} = options ? options : {};
        let params = new HttpParams()
            .set('page', String(page))
            .set('page_size', String(pageSize));

        for (const field of Object.keys(filters)) {
            params = params.set(`${field}`, String(filters[field]));
        }

        if (options?.recent ?? false) {
            params = params.set('ordering', '-last_viewed');
        }

        return this.http
            .get<PaginatedResult<QuestionAnalytics>>(url, {params})
            .pipe(catchError(this.apiService.handleError<PaginatedResult<QuestionAnalytics>>(`Error occurred while fetching question analytics`)));
    }

    getJavaQuestionAnalyticsByQuestion(questionId: number): Observable<QuestionAnalytics[]> {
        const params = new HttpParams()
            .set('question', String(questionId));
        const url = this.apiService.getURL('java-question-analytics');
        return this.http
            .get<PaginatedResult<QuestionAnalytics>>(url, {params})
            .pipe(map(x => x.results))
            .pipe(catchError(this.apiService.handleError<QuestionAnalytics[]>(`Error Occurred while fetching user-specific data for this question analytics`)));
    }

    getParsonsQuestionAnalyticsByQuestion(questionId: number): Observable<QuestionAnalytics[]> {
        const params = new HttpParams()
            .set('question', String(questionId));
        const url = this.apiService.getURL('parsons-question-analytics');
        return this.http
            .get<PaginatedResult<QuestionAnalytics>>(url, {params})
            .pipe(map(x => x.results))
            .pipe(catchError(this.apiService.handleError<QuestionAnalytics[]>(`Error Occurred while fetching user-specific data for this question analytics`)));
    }

    getMCQQuestionAnalyticsByQuestion(questionId: number): Observable<QuestionAnalytics[]> {
        const params = new HttpParams()
            .set('question', String(questionId));
        const url = this.apiService.getURL('mcq-question-analytics');
        return this.http
            .get<PaginatedResult<QuestionAnalytics>>(url, {params})
            .pipe(map(x => x.results))
            .pipe(catchError(this.apiService.handleError<QuestionAnalytics[]>(`Error Occurred while fetching user-specific data for this question analytics`)));
    }

    initQuestionAnalytics(): Observable<any>{
        const url =  new URL('analytics/question-analytics', environment.apiBaseUrl).toString();
        return this.http.get(url);
    }
}
