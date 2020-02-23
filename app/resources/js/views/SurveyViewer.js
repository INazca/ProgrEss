/* eslint-disable no-underscore-dangle */
/* eslint-env browser */
var cardsContainer = document.getElementById("cards-container");

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

    updateUI(type, isViewable1, isViewable2, isCorrect) {
        console.log(type + ", " + isViewable1 + ", " + isViewable2);
        if (type === "solve") {
            this.controls.prev.classList.add("hidden");
            this.controls.next.classList.add("hidden");
            this.controls.correct.classList.add("hidden");
            this.controls.incorrect.classList.add("hidden");
            this.controls.submit.classList.remove("hidden");
        } else if (type === "solve-done") {
            this.controls.prev.classList.remove("hidden");
            this.controls.next.classList.remove("hidden");
            this.controls.correct.classList.add("hidden");
            this.controls.incorrect.classList.add("hidden");
            this.controls.submit.classList.add("hidden");

            this.controls.prev.disabled = !isViewable1;
            this.controls.next.disabled = !isViewable2;
        } else if (type === "evaluate") {
            this.controls.prev.classList.remove("hidden");
            this.controls.next.classList.remove("hidden");
            this.controls.correct.classList.add("hidden");
            this.controls.incorrect.classList.add("hidden");
            this.controls.submit.classList.remove("hidden");

            this.controls.prev.disabled = !isViewable1;
            this.controls.next.disabled = !isViewable2;
        } else if (type === "evaluate-correctness") {
            this.controls.prev.classList.remove("hidden");
            this.controls.next.classList.remove("hidden");
            this.controls.correct.classList.remove("hidden");
            this.controls.incorrect.classList.remove("hidden");
            this.controls.submit.classList.add("hidden");

            this.controls.prev.disabled = !isViewable1;
            this.controls.next.disabled = !isViewable2; 
            this.controls.correct.disabled = false;
            this.controls.incorrect.disabled = false;

            this.controls.correct.classList.remove("inactive");
            this.controls.incorrect.classList.remove("inactive");
        } else if (type === "evaluate-done") {
            this.controls.prev.classList.remove("hidden");
            this.controls.next.classList.remove("hidden");
            this.controls.correct.classList.add("hidden");
            this.controls.incorrect.classList.add("hidden");
            this.controls.submit.classList.add("hidden");

            this.controls.prev.disabled = !isViewable1;
            this.controls.next.disabled = !isViewable2;
        } else if (type === "evaluate-correctness-done") {
            this.controls.prev.classList.remove("hidden");
            this.controls.next.classList.remove("hidden");
            this.controls.correct.classList.remove("hidden");
            this.controls.incorrect.classList.remove("hidden");
            this.controls.submit.classList.add("hidden");

            this.controls.prev.disabled = !isViewable1;
            this.controls.next.disabled = !isViewable2; 
            this.controls.correct.disabled = !isCorrect;
            this.controls.incorrect.disabled = isCorrect;

            this.controls.correct.classList.remove("inactive");
            this.controls.incorrect.classList.remove("inactive");
            if(isCorrect) {
                this.controls.correct.classList.add("inactive");
            } else {
                this.controls.incorrect.classList.add("inactive");
            }
        } else if (type === "none") {
            this.hideAllControlls();
        }
    }

    hideAllControlls() {
        this.controls.prev.classList.add("hidden");
        this.controls.next.classList.add("hidden");
        this.controls.correct.classList.add("hidden");
        this.controls.incorrect.classList.add("hidden");
        this.controls.submit.classList.add("hidden");
    }

    updateHTML(cards) {
        cardsContainer.innerHTML = "";

        cards.forEach(card => {
            cardsContainer.appendChild(card.node);
        });
    }
}

export default SurveyViewer;