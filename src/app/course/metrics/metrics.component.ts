import {Component, Input, OnInit} from '@angular/core';
import {CourseEvent, User} from "@app/_models";
import {SubmissionAnalytics} from "@app/_models/submission_analytics";
import {AuthenticationService} from "@app/_services/api/authentication";
import {SubmissionAnalyticsService} from "@app/course/_services/submission-analytics.service";


@Component({
    selector: 'app-submission',
    templateUrl:'./metrics.component.html',
    styleUrls: ['./metrics.component.scss']
})



export class MetricsComponent implements OnInit{
    user: User;
    submissions: SubmissionAnalytics[];
    @Input() events: CourseEvent[];
    @Input() courseId: number;

    constructor(private authenticationService: AuthenticationService, private submissionService: SubmissionAnalyticsService){}


    ngOnInit():void {
        this.authenticationService.currentUser.subscribe(user => this.user = user);
        this.submissionService.getAllSubmissionAnalytics().subscribe(submissions => {
            this.submissions = submissions.results;
        });
    }
}
