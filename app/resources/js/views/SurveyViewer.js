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

    updateUI(type, isViewable1, isViewable2) {
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
        } else if (type === "evaluate-done") {
            this.controls.prev.classList.remove("hidden");
            this.controls.next.classList.remove("hidden");
            this.controls.correct.classList.add("hidden");
            this.controls.incorrect.classList.add("hidden");
            this.controls.submit.classList.add("hidden");

            this.controls.prev.disabled = !isViewable1;
            this.controls.next.disabled = !isViewable2;
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