/* eslint-disable no-underscore-dangle */
/* eslint-env browser */

class SurveyViewer {

    constructor(prev, next, correct, incorrect, submit) {
        this.controls = {
            prev: prev,
            next: next,
            correct: correct,
            incorrect: incorrect,
            submit: submit,
        };
    }

    hideAll(isHidden) {
        let controls = this.controls;

        Object.keys(this.controls).forEach(function (key) {
            if(isHidden) {
                controls[key].classList.add("hidden");
            } else {
                controls[key].classList.remove("hidden");
            }
        });
    }
}

export default SurveyViewer;