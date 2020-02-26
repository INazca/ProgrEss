/* eslint-env browser */
import SurveyViewer from "../js/views/SurveyViewer.js";
import Syntax from "../js/tasks/Syntax.js";
import SyntaxMark from "../js/controller/syntax-highlighting/SyntaxMark.js";
import SyntaxEvaluation from "../js/controller/syntax-highlighting/SyntaxEvaluation.js";
import SyntaxDiscussion from "../js/controller/syntax-highlighting/SyntaxDiscussion.js";
import Examples from "../js/utils/Examples.js";
import SyntaxReveal from "./controller/syntax-highlighting/SyntaxReveal.js";
import TypeDetermination from "./tasks/Type.js";
import TypeSolve from "./controller/type-determination/TypeSolve.js";
import TypeEvaluation from "./controller/type-determination/TypeEvaluation.js";
import TypeDiscussion from "./controller/type-determination/TypeDiscussion.js";
import TypeReveal from "./controller/type-determination/TypeReveal.js";
import Microtask from "./tasks/Microtask.js";
import MicrotaskSolve from "./controller/microtask/MicrotaskSolve.js";
import MicrotaskEvaluation from "./controller/microtask/MicrotaskEvaluation.js";
import MicrotaskDiscussion from "./controller/microtask/MicrotaskDiscussion.js";
import MicrotaskReveal from "./controller/microtask/MicrotaskReveal.js";
import Animation from "./utils/Animation.js";

var prev,
    next,
    correct,
    incorrect,
    submit,
    view,
    survey = [],
    cards = [],
    activeIndex = -1;

function init() {
    initControls();
    view = new SurveyViewer(prev, next, correct, incorrect, submit);

    listenForContinue();

    parseData();
    initSurvey();
}

function initControls() {
    prev = document.getElementById("controls-prev");
    next = document.getElementById("controls-next");
    correct = document.getElementById("controls-correct");
    incorrect = document.getElementById("controls-incorrect");
    submit = document.getElementById("controls-submit");

    prev.addEventListener("click", onPrev);
    next.addEventListener("click", onNext);
    correct.addEventListener("click", onCorrect);
    incorrect.addEventListener("click", onIncorrect);
    submit.addEventListener("click", onSubmit);
}

function listenForContinue() {
    document.onkeydown = function (e) {
        e = e || window.event;

        if (e.code === "End") {
            endCard();
        }
    };
}

function parseData() {
    survey.push(new Syntax(Examples.syntax.task, Examples.syntax.code, 5, Examples.syntax.highlights, Examples.syntax.heatmap, Examples.syntax.solution));
    survey.push(new TypeDetermination(Examples.type.code, Examples.type.highlight, 10, Examples.type.evaluations, Examples.type.expression, Examples.type.histogramm, Examples.type.solution));
    survey.push(new Microtask(Examples.microtask.task, Examples.microtask.code, 20, Examples.microtask.evaluations, Examples.microtask.discussionSolutions, Examples.microtask.solution));
}

function initSurvey() {
    createCards();
    view.updateHTML(cards);
}

function createCards() {
    survey.forEach(type => {
        var task = type.data;

        //create cards if the task type is syntax highlighting
        if (task.type === "syntax") {
            cards.push(new SyntaxMark(task.solve));
            task.evaluate.forEach(evaluation => {
                cards.push(new SyntaxEvaluation(evaluation));
            });
            cards.push(new SyntaxDiscussion(task.discussion));
            cards.push(new SyntaxReveal(task.reveal));
        }

        //create cards if the task type is type determination
        if (task.type === "type") {
            cards.push(new TypeSolve(task.solve));
            task.evaluate.forEach(evaluation => {
                cards.push(new TypeEvaluation(evaluation));
            });
            cards.push(new TypeDiscussion(task.discussion));
            cards.push(new TypeReveal(task.reveal));
        }

        //create cards if the task type is microtask
        if (task.type === "microtask") {
            cards.push(new MicrotaskSolve(task.solve));
            task.evaluate.forEach(evaluation => {
                cards.push(new MicrotaskEvaluation(evaluation));
            });
            cards.push(new MicrotaskDiscussion(task.discussion));
            cards.push(new MicrotaskReveal(task.reveal));
        }
    });
}

function showCard(index) {
    var isCorrect;

    cards[index].show();

    if (cards[index].isCorrect) {
        isCorrect = cards[index].isCorrect;
    }

    //activate buttons for switching cards, choose the right cases
    if (index === 0) {
        view.updateUI(cards[index].controlType, false, cards[index + 1].viewable, isCorrect);
    } else if (index === cards.length - 1) {
        view.updateUI(cards[index].controlType, cards[index - 1].viewable, false, isCorrect);
    } else {
        view.updateUI(cards[index].controlType, cards[index - 1].viewable, cards[index + 1].viewable, isCorrect);
    }
}

function hideCardRight(index) {
    cards[index].hideRight();
}

function hideCardLeft(index) {
    cards[index].hideLeft();
}

function endCard() {
    if (activeIndex > -1) {
        cards[activeIndex].end();
    }

    if (activeIndex < cards.length - 1) {
        activeIndex++;
        showCard(activeIndex);
    } else {
        endSurvey();
    }
}

function endSurvey() {
    //add code here
}

//event handler
function onPrev() {
    Animation.click(prev);
    activeIndex--;
    hideCardRight(activeIndex + 1);
    showCard(activeIndex);
}

function onNext() {
    Animation.click(next);
    activeIndex++;
    hideCardLeft(activeIndex - 1);
    showCard(activeIndex);
}

function onCorrect() {
    if (!correct.classList.contains("inactive")) {
        Animation.click(correct);
        cards[activeIndex].isCorrect = true;
        endCard();
    }
}

function onIncorrect() {
    if (!incorrect.classList.contains("inactive")) {
        Animation.click(incorrect);
        cards[activeIndex].isCorrect = false;
        endCard();
    }
}

function onSubmit() {
    Animation.click(submit);
    endCard();
}

init();