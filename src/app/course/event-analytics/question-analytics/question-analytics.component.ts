import {Component, OnInit} from '@angular/core';
import {QuestionAnalytics} from "@app/_models/analytics";
import {Question, UQJ} from "@app/_models";
import {QuestionAnalyticsService} from "@app/course/_services/question-analytics.service";
import {UqjService} from "@app/problems/_services/uqj.service";
import {ActivatedRoute} from "@angular/router";


@Component({
    selector: 'app-question-analytics',
    templateUrl: './question-analytics.component.html',
    styleUrls: ['./question-analytics.component.scss']
})
export class QuestionAnalyticsComponent implements OnInit {

    questionAnalytics: QuestionAnalytics[];
    uqjs: UQJ[] = [];
    display = 'block';

    constructor(private questionAnalyticsService: QuestionAnalyticsService, private uqjService: UqjService,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.questionAnalyticsService.getQuestionAnalyticsByEvent(Number(this.route.snapshot.paramMap.get('eventId'))).subscribe(
            questionAnalytics => {
                if(questionAnalytics){
                    this.hideLoader();
                }
                this.questionAnalytics = questionAnalytics;
                for (let i = 0; i < questionAnalytics.length; i++) {
                    this.uqjService.getUQJByQuestion(questionAnalytics[i].question.id).subscribe(
                        uqj => {
                            this.uqjs.push(uqj);
                        }
                    );
                }
            }
        );

    }

    hideLoader(): void{
        this.display = 'none';
    }


    getUQJ(question: Question): UQJ {
        for (const i in this.uqjs) {
            if (this.uqjs[i].question.id === question.id) {
                return this.uqjs[i];
            }
        }
        return null;
    }

    getResponsePercentage(analytics: QuestionAnalytics, answer: string): string {
        let sum = 0;
        sum += analytics.most_frequent_wrong_ans[0]['a'];
        sum += analytics.most_frequent_wrong_ans[0]['b'];
        sum += analytics.most_frequent_wrong_ans[0]['c'];
        sum += analytics.most_frequent_wrong_ans[0]['d'];
        return String((analytics.most_frequent_wrong_ans[0][answer] / sum * 100).toFixed(2)) + "%";
    }


    parseFloat(value: number): number{
        return Math.round(value);
    }

}
