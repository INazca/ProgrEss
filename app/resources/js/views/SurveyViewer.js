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

    showCard() {
        var cards = document.getElementsByClassName("survey-card");

        $(cards[0]).animate({left: 0}, "slow");
    }

    changeCard() {
        var cards = document.getElementsByClassName("survey-card");

        $(cards[0]).animate({right: "100%"}, "slow");
        $(cards[1]).animate({left: 0}, "slow");
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