import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SubmissionAnalyticsService} from "@app/course/_services/submission-analytics.service";
import {QuestionAnalytics, SubmissionAnalytics} from "@app/_models/submission_analytics";
import {UQJ} from "@app/_models";
import {UqjService} from "@app/problems/_services/uqj.service";
import {QuestionSubmission} from "@app/_models/question_submission";
import {SubmissionService} from "@app/problems/_services/submission.service";
import {QuestionAnalyticsService} from "@app/course/_services/question-analytics.service";


@Component({
    selector: 'app-metrics-view',
    templateUrl: './metrics-view.component.html',
    styleUrls: ['./metrics-view.component.scss']
})
export class MetricsViewComponent implements OnInit{

    questionId: number;
    eventId: number;
    analytics: SubmissionAnalytics[];
    type: string;
    questionMetrics: QuestionAnalytics;
    uqj: UQJ;
    distinctUsers: Map<number, string> = new Map<number, string>();
    answerFiles: {name: string, code: string}[];
    constructor(private route: ActivatedRoute, private submissionAnalyticsService: SubmissionAnalyticsService,
                private questionAnalyticsService: QuestionAnalyticsService, private uqjService: UqjService,
                private submissionService: SubmissionService) { }

    ngOnInit(): void {
        this.questionId = this.route.snapshot.params.id;
        this.eventId = this.route.snapshot.params.eventId;
        this.submissionAnalyticsService.getAnalyticsByQuestion(this.questionId).subscribe(submissions => {
            this.analytics = submissions;
            if(submissions){
                for(const submission of submissions){
                    this.type = submission.submission_type;
                    this.distinctUsers.set(submission.user_id, submission.first_name+" " + submission.last_name);
                }
            }
        });
        this.questionAnalyticsService.getQuestionMetricsByQuestion(this.questionId).subscribe(
            metrics=> this.questionMetrics = metrics[0]);

        this.uqjService.getUQJByQuestion(this.questionId).subscribe(uqj => this.uqj = uqj);

    }

}
