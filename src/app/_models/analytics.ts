import {Course} from "@app/_models/course";
import {CourseEvent} from "@app/_models/course_event";
import {Question} from "@app/_models/question";

export interface QuestionAnalytics{
    id: number;
    time_created: Date;
    question: Question;
    event: CourseEvent;
    course: Course;

    most_frequent_wrong_ans: JSON;
    avg_grade: number;
    grade_std_dev: number;
    num_respondents: number;
    avg_attempt: number;
    attempt_std_dev: number;
    median_time_spent: number;

    lines: number;
    blank_lines: number;
    comment_lines: number;
    import_lines: number;
    cc: number;
    method: number;
    operator: number;
    operand: number;
    unique_operator: number;
    unique_operand: number;
    vocab: number;
    size: number;
    vol: number;
    difficulty: number;
    effort: number;
    error: number;
    test_time: number;

}
export interface EventAnalytics {
    id: number;
    time_created: Date;
    event: CourseEvent;
    course: Course;
    high_score: number;
    lowest_score: number;
    avg_score: number;
    avg_score_st_dev: number;
    num_participants: number;
    grades: JSON;
}
