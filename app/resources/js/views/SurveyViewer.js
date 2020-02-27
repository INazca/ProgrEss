/* eslint-disable no-underscore-dangle */
/* eslint-env browser */
import Animation from "../utils/Animation.js";

var cardsContainer = document.getElementById("cards-container");

class SurveyViewer {

    constructor(prev, next, correct, incorrect, submit) {
        this.controls = {
            prev: {button: prev, isShown: false},
            next: {button: next, isShown: false},
            correct: {button: correct, isShown: false},
            incorrect: {button: incorrect},
            submit: {button: submit, isShown: false},
        };
        this.statusBar = initStatusBar();
        this.header = document.getElementsByClassName("navbar")[0];
    }

    updateUI(type, isViewable1, isViewable2, isCorrect) {
        if (type === "solve") {
            showControls(this, false, false, false, true);

            this.resetStatusBar();
            this.statusBar.solve.stage.classList.remove("hidden");
            this.statusBar.solve.circles[0].classList.add("status-circle-active");
            this.statusBar.solve.circles[0].classList.add("solve-color");
            this.statusBar.solve.circles[1].classList.remove("hidden");
        } else if (type === "solve-done") {
            showControls(this, true, true, false, false);

            this.controls.prev.button.disabled = !isViewable1;
            this.controls.next.button.disabled = !isViewable2;
        } else if (type === "evaluate") {
            showControls(this, true, true, false, true);

            this.controls.prev.button.disabled = !isViewable1;
            this.controls.next.button.disabled = !isViewable2;

            this.resetStatusBar();
            this.statusBar.evaluate.stage.classList.remove("hidden");
            this.statusBar.evaluate.circles[0].classList.add("status-circle-active");
            this.statusBar.evaluate.circles[0].classList.add("evaluate-color");
            this.statusBar.evaluate.circles[1].classList.remove("hidden");
        } else if (type === "evaluate-correctness") {
            showControls(this, true, true, true, false);

            this.controls.prev.button.disabled = !isViewable1;
            this.controls.next.button.disabled = !isViewable2; 
            this.controls.correct.button.disabled = false;
            this.controls.incorrect.button.disabled = false;

            this.controls.correct.button.classList.remove("inactive");
            this.controls.incorrect.button.classList.remove("inactive");

            this.resetStatusBar();
            this.statusBar.evaluate.stage.classList.remove("hidden");
            this.statusBar.evaluate.circles[0].classList.add("status-circle-active");
            this.statusBar.evaluate.circles[0].classList.add("evaluate-color");
            this.statusBar.evaluate.circles[1].classList.remove("hidden");
        } else if (type === "evaluate-done") {
            showControls(this, true, true, false, false);

            this.controls.prev.button.disabled = !isViewable1;
            this.controls.next.button.disabled = !isViewable2;
        } else if (type === "evaluate-correctness-done") {
            showControls(this, true, true, true, false);

            this.controls.prev.button.disabled = !isViewable1;
            this.controls.next.button.disabled = !isViewable2; 
            this.controls.correct.button.disabled = !isCorrect;
            this.controls.incorrect.button.disabled = isCorrect;

            this.controls.correct.button.classList.remove("inactive");
            this.controls.incorrect.button.classList.remove("inactive");
            if(isCorrect) {
                this.controls.correct.button.classList.add("inactive");
            } else {
                this.controls.incorrect.button.classList.add("inactive");
            }
        } else if (type === "discussion") {
            showControls(this, false, false, false, false);

            this.resetStatusBar();
            this.statusBar.discussion.stage.classList.remove("hidden");
            this.statusBar.discussion.circles[0].classList.add("status-circle-active");
            this.statusBar.discussion.circles[0].classList.add("discussion-color");
            this.statusBar.discussion.circles[1].classList.remove("hidden");
        } else if (type === "reveal") {
            showControls(this, false, false, false, false);

            this.resetStatusBar();
            this.statusBar.reveal.stage.classList.remove("hidden");
            this.statusBar.reveal.circles[0].classList.add("status-circle-active");
            this.statusBar.reveal.circles[0].classList.add("reveal-color");
            this.statusBar.reveal.circles[1].classList.remove("hidden");
        }
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

        setupEditorContainers()
    }
}

function showControls(self, isShownPrev, isShownNext, isShownCorrect, isShownSubmit) {

    if(isShownPrev) {
        if(!self.controls.prev.isShown) {
            Animation.showLeft(self.controls.prev.button);
            self.controls.prev.isShown = true;
        }
    } else {
        if(self.controls.prev.isShown) {
            Animation.hideLeft(self.controls.prev.button);
            self.controls.prev.isShown = false;
        }
    }
    
    if(isShownNext) {
        if(!self.controls.next.isShown) {
            Animation.showRight(self.controls.next.button);
            self.controls.next.isShown = true;
        }
    } else {
        if(self.controls.next.isShown) {
            Animation.hideRight(self.controls.next.button);
            self.controls.next.isShown = false;
        }
    }
    
    if(isShownCorrect) {
        if(!self.controls.correct.isShown) {
            Animation.showBottom(self.controls.correct.button);
            Animation.showBottom(self.controls.incorrect.button);
            self.controls.correct.isShown = true;
        }
    } else {
        if(self.controls.correct.isShown) {
            Animation.hideBottom(self.controls.correct.button);
            Animation.hideBottom(self.controls.incorrect.button);
            self.controls.correct.isShown = false;
        }
    }
    
    if(isShownSubmit) {
        if(!self.controls.submit.isShown) {
            Animation.showBottom(self.controls.submit.button);
            self.controls.submit.isShown = true;
        }
    } else {
        if(self.controls.submit.isShown) {
            Animation.hideBottom(self.controls.submit.button);
            self.controls.submit.isShown = false;
        }
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

function setupEditorContainers() {
    var containers = document.getElementsByClassName("editor-container");

    for(let i = 0; i < containers.length; i++) {
        containers[i].style.maxHeight = (containers[i].offsetHeight - 10) + "px";
        containers[i].style.maxWidth = (containers[i].offsetWidth - 10) + "px";
    }
}

export default SurveyViewer;