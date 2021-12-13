import {Component, Input, OnInit} from '@angular/core';
import {UQJ} from "@app/_models";
import {QuestionAnalytics, SubmissionAnalytics} from "@app/_models/submission_analytics";
import {ActivatedRoute} from "@angular/router";
import {SubmissionAnalyticsService} from "@app/course/_services/submission-analytics.service";
import {QuestionAnalyticsService} from "@app/course/_services/question-analytics.service";
import {UqjService} from "@app/problems/_services/uqj.service";
import {SubmissionService} from "@app/problems/_services/submission.service";
import {QuestionService} from "@app/problems/_services/question.service";

@Component({
    selector: 'app-mcq-view-snippet',
    templateUrl: './mcq-view-snippet.component.html',
    styleUrls: ['./mcq-view-snippet.component.scss']
})
export class McqViewSnippetComponent implements OnInit {

    @Input() uqj : UQJ;
    questionId: number;
    eventId: number;
    analytics: SubmissionAnalytics[];
    grades: Map<string, number> = new Map<string, number>();
    questionAnalytics: QuestionAnalytics;
    distinctUsers: Map<number, string> = new Map<number, string>();
    answerFiles: {name: string, code: string}[];

    constructor(private route: ActivatedRoute, private submissionAnalyticsService: SubmissionAnalyticsService,
                private questionAnalyticsService: QuestionAnalyticsService, private uqjService: UqjService,
                private submissionService: SubmissionService, private questionService: QuestionService) { }

    ngOnInit(): void {
        this.questionId = this.uqj?.question.id;
        this.eventId = this.uqj?.question.event;

        this.submissionAnalyticsService.getMCQSubmissionAnalyticsByQuestion(this.questionId).subscribe(
            submissionAnalytics => {
                this.analytics = submissionAnalytics;
                if(submissionAnalytics){
                    for(const item of submissionAnalytics){
                        this.submissionService.getSubmission(item.submission).subscribe(
                            submission => this.grades.set(item.submission, submission.grade));
                        this.distinctUsers.set(item.user_id.id, item.first_name+" " + item.last_name);
                    }
                }
            });
        this.questionAnalyticsService.getMCQQuestionAnalyticsByQuestion(this.questionId).subscribe(
            metrics=> this.questionAnalytics = metrics[0]);

    }

}
