import {UQJ} from "@app/_models/uqj";
import {QuestionSubmission} from "@app/_models/question_submission";
import {Question} from "@app/_models/question";
import {CourseEvent} from "@app/_models/course_event";

export interface SubmissionAnalytics {
    id: number;
    submission_type: string;
    user_id: number;
    first_name: string;
    last_name : string;
    uqj: UQJ;
    submission: QuestionSubmission
    question : Question;
    event: CourseEvent;
    ans_file : JSON;
    ans : string;
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
    avg_grade: number;
    frequently_wrong_questions: JSON[];
}

// export interface WrongQuestion{
//             question_number: string;
//             title: string;
//             text: string;
//             answer: string;
//             wrong_answer: string;
//             reason_wrong: string;
//             category: string;
//             num_wrong: number;
//             num_submission: number;
// }
