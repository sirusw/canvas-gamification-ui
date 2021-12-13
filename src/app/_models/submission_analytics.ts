import {Question} from "@app/_models/question";
import {CourseEvent} from "@app/_models/course_event";
import {User} from "@app/_models/user";

export interface SubmissionAnalytics {
    id: number;
    user_id: User;
    first_name: string;
    last_name : string;
    uqj: number;
    submission: any;
    question : number;
    event: number;
    ans_file : JSON;
    ans: string;
    lines : number;
    blank_lines : number;
    comment_lines : number;
    import_lines : number;
    cc : number;
    method : number;
    operator : number;
    operand : number;
    unique_operator : number;
    unique_operand : number;
    vocab : number;
    size : number;
    vol : number;
    difficulty : number;
    effort : number;
    error : number;
    test_time : number;

}

export interface QuestionAnalytics {
    id: number;
    question: Question;
    event: CourseEvent;
    number_submission: number;
    frequent_wrong_ans: string;
    wrong_reason: string;
    avg_grade: number;
    correct_rate: number;
    lines : number;
    blank_lines : number;
    comment_lines : number;
    import_lines : number;
    cc : number;
    method : number;
    operator : number;
    operand : number;
    unique_operator : number;
    unique_operand : number;
    vocab : number;
    size : number;
    vol : number;
    difficulty : number;
    effort : number;
    error : number;
    test_time : number;

}

export interface EventAnalytics{
    id: number;
    event: CourseEvent;
    num_question: number;
    avg_grade: number;
    frequent_wrong_questions: string;
}
