import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProblemViewComponent} from '../../problem-view/problem-view.component';
import {TestModule} from '@test/test.module';
import {SubmissionService} from "@app/problems/_services/submission.service";
import {SubmissionServiceMock} from "@app/problems/_test/_services/submission.service.mock";
import {UqjService} from "@app/problems/_services/uqj.service";
import {UqjServiceMock} from "@app/problems/_test/_services/uqj.service.mock";
import {ActivatedRoute} from "@angular/router";
import {MOCK_QUESTION_SUBMISSION, MOCK_SUBMISSIONS, MOCK_UQJ, MOCK_UQJS} from "@app/problems/_test/mock";
import {TitleCasePipe} from "@angular/common";

describe('ProblemViewComponent', () => {
    let component: ProblemViewComponent;
    let fixture: ComponentFixture<ProblemViewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestModule],
            declarations: [ProblemViewComponent, TitleCasePipe],
            providers: [
                {provide: SubmissionService, useClass: SubmissionServiceMock},
                {provide: UqjService, useClass: UqjServiceMock},
                {
                    provide: ActivatedRoute, useValue: {
                        snapshot: {
                            params: {
                                id: 0
                            }
                        }
                    }
                }
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ProblemViewComponent);
        component = fixture.componentInstance;
        component.uqj = MOCK_UQJ;
        component.previousSubmissions = [MOCK_QUESTION_SUBMISSION];
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have one uqj', async () => {
        expect(component.uqj).toEqual(MOCK_UQJS.find(uqj => uqj.id === 0));
    });

    it('should have one submission', async () => {
        expect(component.previousSubmissions.length).toEqual(1);
        expect(component.previousSubmissions[0]).toEqual(MOCK_SUBMISSIONS.find(submission => submission.question.id === 0));
    });
});
