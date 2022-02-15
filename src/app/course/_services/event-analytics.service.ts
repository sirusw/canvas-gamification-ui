import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ApiService} from "@app/_services/api.service";
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";
import {EventAnalytics} from "@app/_models/analytics";

@Injectable({
    providedIn: 'root'
})
export class EventAnalyticsService {

    constructor(private http: HttpClient,
        private apiService: ApiService) { }

    getEventAnalyticsByEvent(eventId: number): Observable<EventAnalytics> {
        const params = new HttpParams()
            .set('id', String(eventId));
        const url = this.apiService.getURL('analytics', 'event', 'event');
        return this.http
            .get<EventAnalytics>(url, {params})
            .pipe(catchError(this.apiService.handleError<EventAnalytics>(`Error Occurred while fetching data for this event analytics`)));
    }
}
