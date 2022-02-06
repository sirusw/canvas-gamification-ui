import { Component, OnInit } from '@angular/core';
import {EventAnalytics, QuestionAnalytics} from "@app/_models/analytics";
import {ActivatedRoute} from "@angular/router";
import {EventAnalyticsService} from "@app/course/_services/event-analytics.service";
import {QuestionAnalyticsService} from "@app/course/_services/question-analytics.service";
import {UqjService} from "@app/problems/_services/uqj.service";
import {Question, UQJ} from "@app/_models";

@Component({
  selector: 'app-event-analytics',
  templateUrl: './event-analytics.component.html',
  styleUrls: ['./event-analytics.component.scss']
})
export class EventAnalyticsComponent implements OnInit {

    eventId: number;
    eventAnalytics: EventAnalytics;
    questionAnalytics: QuestionAnalytics[];
    uqjs: UQJ[] = [];
    wrong_ans_distr: [{[question: string]: {[ans: string]:  number}}]
    constructor(private eventAnalyticsService: EventAnalyticsService, private route: ActivatedRoute,
                private questionAnalyticsService: QuestionAnalyticsService, private uqjService: UqjService) {}


    ngOnInit(): void {
        this.eventId = Number(this.route.snapshot.paramMap.get('eventId'));
        this.eventAnalyticsService.getEventAnalyticsByEvent(Number(this.route.snapshot.paramMap.get('eventId'))).subscribe(
            eventAnalytics => {
                this.eventAnalytics = eventAnalytics;
                this.calcGradeDistribution(eventAnalytics.grades['grades']);
            }
        );
        this.questionAnalyticsService.getQuestionAnalyticsByEvent(Number(this.route.snapshot.paramMap.get('eventId'))).subscribe(
            questionAnalytics => {
                this.questionAnalytics = questionAnalytics;
                for(let i = 0; i<questionAnalytics.length; i++){
                    this.uqjService.getUQJByQuestion(questionAnalytics[i].question.id).subscribe(
                        uqj => {
                            this.uqjs.push(uqj);
                        }
                    );
                }
            }
        );
    }
    readonly gradeX = ['0%', '10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%']
    readonly gradeY = ['0', '5', '10' ,'15', '20'];

    readonly gradeDistr = [
        [0, 0, 2, 5, 13, 14, 10, 20, 15, 5, 1]
    ];

    calcGradeDistribution(grades: number[]): number[]{
        return [0,1];
    }

    getUQJ(question: Question): UQJ{
        for(let i in this.uqjs){
            if(this.uqjs[i].question.id === question.id){
                return this.uqjs[i];
            }
        }
        return null;
    }

    getResponsePercentage(analytics: QuestionAnalytics, answer: string): string{
        let sum = 0;
        sum += analytics.most_frequent_wrong_ans[0]['a'];
        sum += analytics.most_frequent_wrong_ans[0]['b'];
        sum += analytics.most_frequent_wrong_ans[0]['c'];
        sum += analytics.most_frequent_wrong_ans[0]['d'];
        return String(analytics.most_frequent_wrong_ans[0][answer] / sum * 100) + "%";
    }
}
