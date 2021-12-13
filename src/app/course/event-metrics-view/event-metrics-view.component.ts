import { Component, OnInit } from '@angular/core';
import {SubmissionAnalyticsService} from "@app/course/_services/submission-analytics.service";
import {QuestionAnalyticsService} from "@app/course/_services/question-analytics.service";
import {UqjService} from "@app/problems/_services/uqj.service";
import {SubmissionService} from "@app/problems/_services/submission.service";
import {ActivatedRoute} from "@angular/router";
import {EventAnalyticsService} from "@app/course/_services/event-analytics.service";
import {EventAnalytics} from "@app/_models/submission_analytics";
import {CourseEvent} from "@app/_models";
import {CourseEventService} from "@app/course/_services/course-event.service";

@Component({
    selector: 'app-event-metrics-view',
    templateUrl: './event-metrics-view.component.html',
    styleUrls: ['./event-metrics-view.component.scss']
})
export class EventMetricsViewComponent implements OnInit {

  eventId: number;
  eventAnalytics: EventAnalytics;
  event: CourseEvent;
  courseId: number;
  wrongQuestions: any;

  constructor(private route: ActivatedRoute, private submissionAnalyticsService: SubmissionAnalyticsService,
              private questionMetricsService: QuestionAnalyticsService, private uqjService: UqjService,
              private submissionService: SubmissionService, private eventAnalyticsService: EventAnalyticsService,
              private eventService: CourseEventService) { }

  ngOnInit(): void {
      this.eventId = this.route.snapshot.params.eventId;
      this.courseId = this.route.snapshot.params.courseId;
      this.eventService.getCourseEvent(this.eventId).subscribe(event => this.event = event);
      this.eventAnalyticsService.getEventAnalyticsByEvent(this.eventId).subscribe(
          eventAnalytics=>{
              this.eventAnalytics = eventAnalytics.results[0];
              const wrongQuestion = eventAnalytics.results[0].frequent_wrong_questions;
              this.wrongQuestions = JSON.parse(wrongQuestion);
          });
  }


  capitalizeFirstLetter(name: string): string {
      if(name != null){
          return name.charAt(0).toUpperCase() + name.slice(1);
      }
      else return name;

  }
  trimTag(str: string): string{
      if(str.charAt(0) === '<' && str.charAt(str.length-1) === '>'){
          return str.slice(3, str.length-4);
      }
      else return str;
  }
}

