import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Question} from "@app/_models";
import {fieldExistsIfOtherExistsValidator} from "@app/_helpers/forms/validators/field-exists-if-other-exists.validator";

export class JavaForm {
    /**
     * Creates a FormGroup for a Java question.
     */
    static createForm(): FormGroup {
        return new FormGroup({
            title: new FormControl(null, [Validators.required]),
            difficulty: new FormControl(null, [Validators.required]),
            category: new FormControl(null, [Validators.required]),
            is_verified: new FormControl(false),
            course: new FormControl(null),
            event: new FormControl(null),
            text: new FormControl('', [Validators.required]),
            junit_template: new FormControl(null, [Validators.required]),
            input_files: new FormControl([], [Validators.required]),
            variables: new FormControl([])
        }, [fieldExistsIfOtherExistsValidator('event', 'course')]
        );
    }

    /**
     * Creates a FormGroup for a Java question with existing data.
     * @param question - The question object.
     */
    static createFormWithData(question: Question): FormGroup {
        const newForm = this.createForm();
        newForm.patchValue({
            ...question,
            course: question.event_obj?.course
        });
        return newForm;
    }
}

export interface JavaFormData {
    title: string,
    difficulty: string,
    course: number,
    event: number,
    text: string,
    category: number,
    variables: JSON[],
    junit_template: string,
    input_files: JSON,
    is_verified: boolean,
}
