import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ApiService} from "@app/_services/api.service";
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";
import {EventAnalytics} from "@app/_models/submission_analytics";
import {PaginatedResult} from "@app/_models/paginatedResult";
import {environment} from "@environments/environment";

@Injectable({
    providedIn: 'root'
})
export class EventAnalyticsService {

    constructor(private http: HttpClient,
        private apiService: ApiService) { }

    getEventAnalyticsByEvent(eventId: number): Observable<PaginatedResult<EventAnalytics>> {
        const params = new HttpParams()
            .set('event', String(eventId));
        const url = this.apiService.getURL('event-analytics');
        return this.http
            .get<PaginatedResult<EventAnalytics>>(url, {params})
            .pipe(catchError(this.apiService.handleError<PaginatedResult<EventAnalytics>>(`Error Occurred while fetching data for this event analytics`)));
    }

    initEventAnalytics(): Observable<any>{
        const url =  new URL('analytics/event-analytics', environment.apiBaseUrl).toString();
        return this.http.get(url);
    }
}
