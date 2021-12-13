import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventMetricsViewComponent } from './event-metrics-view.component';

describe('EventMetricsViewComponent', () => {
    let component: EventMetricsViewComponent;
    let fixture: ComponentFixture<EventMetricsViewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ EventMetricsViewComponent ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EventMetricsViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
