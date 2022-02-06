import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ApiService} from "@app/_services/api.service";
import {Observable} from "rxjs";
import {UserAnalytics} from "@app/_models/analytics";
import {catchError} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class UserAnalyticsService {

    constructor(private http: HttpClient,
        private apiService: ApiService) { }

    getAllUserAnalyticsByCourse(courseId: number): Observable<UserAnalytics[]> {
        const params = new HttpParams()
            .set('course', String(courseId));
        const url = this.apiService.getURL('analytics', 'user');
        return this.http
            .get<UserAnalytics[]>(url, {params})
            .pipe(catchError(this.apiService.handleError<UserAnalytics[]>(`Error Occurred while fetching data for course-specific user analytics`)));
    }

    getSpecificUserAnalyticsByCourse(courseId: number, userId: number): Observable<UserAnalytics> {
        const params = new HttpParams()
            .set('course', String(courseId))
            .set('user', String(userId));
        const url = this.apiService.getURL('analytics', 'user', 'user');
        return this.http
            .get<UserAnalytics>(url, {params})
            .pipe(catchError(this.apiService.handleError<UserAnalytics>(`Error Occurred while fetching data for this user analytics`)));
    }
}
