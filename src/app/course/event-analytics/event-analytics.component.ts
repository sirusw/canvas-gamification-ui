import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-analytics',
  templateUrl: './event-analytics.component.html',
  styleUrls: ['./event-analytics.component.scss']
})
export class EventAnalyticsComponent implements OnInit {

    constructor() { }

  ngOnInit(): void {
  }
  readonly gradeX = ['0%', '10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'];
    readonly gradeY = ['0', '5', '10' ,'15', '20'];

    readonly gradeDistr = [
        [0, 0, 2, 5, 13, 14, 10, 20, 15, 5, 1]
    ];


}
