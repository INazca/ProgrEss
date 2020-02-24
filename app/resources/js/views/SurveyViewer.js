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
        this.statusBar = initStatusBar();
    }

    updateUI(type, isViewable1, isViewable2, isCorrect) {
        if (type === "solve") {
            this.controls.prev.classList.add("hidden");
            this.controls.next.classList.add("hidden");
            this.controls.correct.classList.add("hidden");
            this.controls.incorrect.classList.add("hidden");
            this.controls.submit.classList.remove("hidden");

            this.resetStatusBar();
            this.statusBar.solve.stage.classList.remove("hidden");
            this.statusBar.solve.circles[0].classList.add("status-circle-active");
            this.statusBar.solve.circles[0].classList.add("solve-color");
            this.statusBar.solve.circles[1].classList.remove("hidden");
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

            this.resetStatusBar();
            this.statusBar.evaluate.stage.classList.remove("hidden");
            this.statusBar.evaluate.circles[0].classList.add("status-circle-active");
            this.statusBar.evaluate.circles[0].classList.add("evaluate-color");
            this.statusBar.evaluate.circles[1].classList.remove("hidden");
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

            this.resetStatusBar();
            this.statusBar.evaluate.stage.classList.remove("hidden");
            this.statusBar.evaluate.circles[0].classList.add("status-circle-active");
            this.statusBar.evaluate.circles[0].classList.add("evaluate-color");
            this.statusBar.evaluate.circles[1].classList.remove("hidden");
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
        } else if (type === "discuss") {
            this.hideAllControlls();

            this.resetStatusBar();
            this.statusBar.discussion.stage.classList.remove("hidden");
            this.statusBar.discussion.circles[0].classList.add("status-circle-active");
            this.statusBar.discussion.circles[0].classList.add("discussion-color");
            this.statusBar.discussion.circles[1].classList.remove("hidden");
        } else if (type === "reveal") {
            this.hideAllControlls();

            this.resetStatusBar();
            this.statusBar.reveal.stage.classList.remove("hidden");
            this.statusBar.reveal.circles[0].classList.add("status-circle-active");
            this.statusBar.reveal.circles[0].classList.add("reveal-color");
            this.statusBar.reveal.circles[1].classList.remove("hidden");
        }
    }

    hideAllControlls() {
        this.controls.prev.classList.add("hidden");
        this.controls.next.classList.add("hidden");
        this.controls.correct.classList.add("hidden");
        this.controls.incorrect.classList.add("hidden");
        this.controls.submit.classList.add("hidden");
    }

    resetStatusBar() {
        let statusBar = this.statusBar;

        Object.keys(statusBar).forEach(function (key) {
            statusBar[key].stage.classList.add("hidden");
            statusBar[key].circles[0].className = "status-circle";
            statusBar[key].circles[1].classList.add("hidden");
        });
    }

    updateHTML(cards) {
        cardsContainer.innerHTML = "";

        cards.forEach(card => {
            cardsContainer.appendChild(card.node);
        });
    }
}

function initStatusBar() {
    var stages,
        outerCircles,
        innerCircles;

    stages = document.getElementsByClassName("stage-text");
    outerCircles = document.getElementsByClassName("status-circle");
    innerCircles = document.getElementsByClassName("status-inner-circle");
    
    return {
        solve: {
            stage: stages[0],
            circles: [outerCircles[0], innerCircles[0]],
        },
        evaluate: {
            stage: stages[1],
            circles: [outerCircles[1], innerCircles[1]],
        },
        discussion: {
            stage: stages[2],
            circles: [outerCircles[2], innerCircles[2]],
        },
        reveal: {
            stage: stages[3],
            circles: [outerCircles[3], innerCircles[3]],
        },
    };
}

export default SurveyViewer;