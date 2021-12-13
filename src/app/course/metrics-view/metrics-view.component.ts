import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SubmissionAnalyticsService} from "@app/course/_services/submission-analytics.service";
import {UqjService} from "@app/problems/_services/uqj.service";
import {SubmissionService} from "@app/problems/_services/submission.service";
import {QuestionAnalyticsService} from "@app/course/_services/question-analytics.service";
import {QuestionService} from "@app/problems/_services/question.service";
import {UQJ} from "@app/_models";


@Component({
    selector: 'app-metrics-view',
    templateUrl: './metrics-view.component.html',
    styleUrls: ['./metrics-view.component.scss']
})
export class MetricsViewComponent implements OnInit{

    questionId: number;
    eventId: number;
    uqj: UQJ;

    constructor(private route: ActivatedRoute, private submissionAnalyticsService: SubmissionAnalyticsService,
                private questionAnalyticsService: QuestionAnalyticsService, private uqjService: UqjService,
                private submissionService: SubmissionService, private questionService: QuestionService) {}

    ngOnInit(): void {

        this.questionId = this.route.snapshot.params.id;
        this.eventId = this.route.snapshot.params.eventId;
        this.uqjService.getUQJByQuestion(this.questionId).subscribe(uqj => this.uqj = uqj);

    }

}
