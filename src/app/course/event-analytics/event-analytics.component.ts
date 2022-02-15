import {Component, OnInit} from '@angular/core';
import {EventAnalytics} from "@app/_models/analytics";
import {ActivatedRoute} from "@angular/router";
import {EventAnalyticsService} from "@app/course/_services/event-analytics.service";

@Component({
    selector: 'app-event-analytics',
    templateUrl: './event-analytics.component.html',
    styleUrls: ['./event-analytics.component.scss']
})
export class EventAnalyticsComponent implements OnInit {

    eventId: number;
    eventAnalytics: EventAnalytics;
    constructor(private eventAnalyticsService: EventAnalyticsService, private route: ActivatedRoute) {}



    ngOnInit(): void {
        this.eventId = Number(this.route.snapshot.paramMap.get('eventId'));
        this.eventAnalyticsService.getEventAnalyticsByEvent(Number(this.route.snapshot.paramMap.get('eventId'))).subscribe(
            eventAnalytics => {
                this.eventAnalytics = eventAnalytics;
                this.calcGradeDistribution(eventAnalytics.grades['grades']);
            }
        );
    }
    // @ViewChild('loading', { static: false }) loading: ElementRef;


    calcGradeDistribution(grades: number[]): number[]{
        return [0,1];
    }

    // getPassingPercentage(analytics: QuestionAnalytics): string{
    //     let sum = 0;
    //     if(analytics.num_passed_submissions[0]){
    //         for(let i in analytics.num_passed_submissions[0]){
    //             sum += analytics.num_passed_submissions[0][i]
    //         }
    //     }
    //     return String(sum / sum * 100) + "%";
    // }
}
