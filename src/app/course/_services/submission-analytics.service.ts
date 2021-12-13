import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ApiService} from "@app/_services/api.service";
import {Observable} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {SubmissionAnalytics} from "@app/_models/submission_analytics";
import {PaginatedResult} from "@app/_models/paginatedResult";

@Injectable({
    providedIn: 'root'
})
export class SubmissionAnalyticsService {

    constructor(private http: HttpClient,
        private apiService: ApiService) { }


    getAllSubmissionAnalytics(options?: {
        filters?: unknown,
        ordering?: unknown,
        page?: number,
        pageSize?: number,
        recent?: boolean
    }): Observable<PaginatedResult<SubmissionAnalytics>> {
        const url = this.apiService.getURL('submission-analytics');
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
            .get<PaginatedResult<SubmissionAnalytics>>(url, {params})
            .pipe(catchError(this.apiService.handleError<PaginatedResult<SubmissionAnalytics>>(`Error occurred while fetching submission analytics`)));
    }


    getJavaSubmissionAnalyticsByQuestion(questionId: number): Observable<SubmissionAnalytics[]> {
        const params = new HttpParams()
            .set('question', String(questionId));
        const url = this.apiService.getURL('java-submission-analytics');
        return this.http
            .get<PaginatedResult<SubmissionAnalytics>>(url, {params})
            .pipe(map(x => x.results))
            .pipe(catchError(this.apiService.handleError<SubmissionAnalytics[]>(`Error Occurred while fetching user-specific data for this submission analytics`)));
    }

    getParsonsSubmissionAnalyticsByQuestion(questionId: number): Observable<SubmissionAnalytics[]> {
        const params = new HttpParams()
            .set('question', String(questionId));
        const url = this.apiService.getURL('parsons-submission-analytics');
        return this.http
            .get<PaginatedResult<SubmissionAnalytics>>(url, {params})
            .pipe(map(x => x.results))
            .pipe(catchError(this.apiService.handleError<SubmissionAnalytics[]>(`Error Occurred while fetching user-specific data for this submission analytics`)));
    }

    getMCQSubmissionAnalyticsByQuestion(questionId: number): Observable<SubmissionAnalytics[]> {
        const params = new HttpParams()
            .set('question', String(questionId));
        const url = this.apiService.getURL('mcq-submission-analytics');
        return this.http
            .get<PaginatedResult<SubmissionAnalytics>>(url, {params})
            .pipe(map(x => x.results))
            .pipe(catchError(this.apiService.handleError<SubmissionAnalytics[]>(`Error Occurred while fetching user-specific data for this submission analytics`)));
    }
}
