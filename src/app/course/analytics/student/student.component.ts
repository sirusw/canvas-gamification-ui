import {Component, Input, OnInit} from '@angular/core';
import {UserAnalyticsService} from "@app/course/_services/user-analytics.service";
import {Course} from "@app/_models";
import {UserAnalytics} from "@app/_models/analytics";

@Component({
    selector: 'app-student',
    templateUrl: './student.component.html',
    styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

    @Input() course: Course;
    userAnalytics: UserAnalytics[];
    userColumns: string[] =  ['Name', 'Past Week Question Page Views', 'Last Time Active', 'Submissions', 'Missing Submissions', 'Current Score'];

    constructor(private userAnalyticsService: UserAnalyticsService) {

    }

    ngOnInit(): void {
        this.userAnalyticsService.getAllUserAnalyticsByCourse(this.course?.id).subscribe(
            analytics => {
                this.userAnalytics = analytics;
                console.log(this.userAnalytics);
            }
        );
    }

}
