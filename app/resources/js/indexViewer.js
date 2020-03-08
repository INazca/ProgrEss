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
import WaitPhase from "./controller/WaitPhase.js";
import Logger from "./utils/Logger.js";

var prev,
    next,
    correct,
    incorrect,
    submit,
    view,
    survey = [],
    cards = [],
    activeIndex = -1,
    isForwardable = true;

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
    //specifiy a continue-key ("END" atm). Pressing the continue-key will show the next card, when possible for its controlType
    document.onkeydown = function (e) {
        e = e || window.event;

        if (e.code === "End" && isForwardable) {
            endCard();
        }
    };
}

function parseData() {
    var dataString = document.getElementById("task-list").innerHTML,
        taskList;

    //when send to the client as JSON-String every "<" and ">" will be replaced with the corresponding html-codes. Calling these functions and saving the value back to
    //dataString will recover the initial state
    dataString = dataString.replace(/&lt;/g, "<");
    dataString = dataString.replace(/&gt;/g, ">");

    taskList = JSON.parse(dataString);

    for (let i = 0; i < taskList.length; i++) {
        let task = taskList[i];

        if(task.type === "syntax") {
            survey.push(new Syntax(task.id, `<span class="bold">Aufgabe ${i+1}:</span> ` + task.task, task.code, task.waitTime, task.highlights, task.heatmap, task.solution));
        } else if (task.type === "type") {
            survey.push(new TypeDetermination(task.id, `<span class="bold">Aufgabe ${i+1}:</span> `, task.code, task.highlight, task.waitTime, task.evaluations, task.expression, task.histogramm, task.solution));
        } else if (task.type === "microtask") {
            survey.push(new Microtask(task.id, `<span class="bold">Aufgabe ${i+1}:</span> ` + task.task, task.code, task.waitTime, task.evaluations, task.discussionSolutions, task.solution));
        }
    }
}

function initSurvey() {
    createCards();
    view.updateHTML(cards);

    //this function starts the survey and shows the first view instantly
    endCard();
}

function createCards() {

    cards.push(new WaitPhase("Bitte warten Sie, bis die Umfrage startet...", {}));

    survey.forEach(type => {
        var task = type.data;

        //create cards if the task type is syntax highlighting
        if (task.type === "syntax") {
            cards.push(new SyntaxMark(task.solve));

            //create waitPhase. By giving the controlType "wait-no-forward" to it, it can not be skipped by using the specified continue-key
            if (task.solve.waitTime > 0) {
                let waitPhase = new WaitPhase("Bitte warten Sie, bis andere Teilnehmer ihre Lösung eingereicht haben...", {waitTime: task.solve.waitTime, controlType: "wait-no-forward"});
                waitPhase.addEventListener("waitEnd", endCard);
                cards.push(waitPhase);
            }

            task.evaluate.forEach(evaluation => {
                cards.push(new SyntaxEvaluation(evaluation));
            });
            cards.push(new SyntaxDiscussion(task.discussion));
            cards.push(new SyntaxReveal(task.reveal));
            cards.push(new WaitPhase(`Füllen Sie bitte nun einen UEQ auf dem rechten Bildschirm aus! Die zugehörige ID lautet: ${task.id}`, {icon: "arrow_right_alt"}));
        }

        //create cards if the task type is type determination
        if (task.type === "type") {
            cards.push(new TypeSolve(task.solve));

            //create waitPhase. By giving the controlType "wait-no-forward" to it, it can not be skipped by using the specified continue-key
            if (task.solve.waitTime > 0) {
                let waitPhase = new WaitPhase("Bitte warten Sie, bis andere Teilnehmer ihre Lösung eingereicht haben...", {waitTime: task.solve.waitTime, controlType: "wait-no-forward"});
                waitPhase.addEventListener("waitEnd", endCard);
                cards.push(waitPhase);
            }

            task.evaluate.forEach(evaluation => {
                cards.push(new TypeEvaluation(evaluation));
            });
            cards.push(new TypeDiscussion(task.discussion));
            cards.push(new TypeReveal(task.reveal));
            cards.push(new WaitPhase(`Füllen Sie bitte nun einen UEQ auf dem rechten Bildschirm aus! Die zugehörige ID lautet: ${task.id}`, {icon: "arrow_right_alt"}));
        }

        //create cards if the task type is microtask
        if (task.type === "microtask") {
            cards.push(new MicrotaskSolve(task.solve));

            //create waitPhase. By giving the controlType "wait-no-forward" to it, it can not be skipped by using the specified continue-key
            if (task.solve.waitTime > 0) {
                let waitPhase = new WaitPhase("Bitte warten Sie, bis andere Teilnehmer ihre Lösung eingereicht haben...", {waitTime: task.solve.waitTime, controlType: "wait-no-forward"});
                waitPhase.addEventListener("waitEnd", endCard);
                cards.push(waitPhase);
            }

            task.evaluate.forEach(evaluation => {
                cards.push(new MicrotaskEvaluation(evaluation));
            });
            cards.push(new MicrotaskDiscussion(task.discussion));
            cards.push(new MicrotaskReveal(task.reveal));
            cards.push(new WaitPhase(`Füllen Sie bitte nun einen UEQ auf dem rechten Bildschirm aus! Die zugehörige ID lautet: ${task.id}`, {icon: "arrow_right_alt"}));
        }
    });

    cards.push(new WaitPhase("Füllen Sie bitte nun noch einen SUS-Fragebogen auf dem rechten Bildschirm aus!", {icon: "edit"}));
    cards.push(new WaitPhase("Vielen Dank für Ihre Teilnahme! Bitte schließen Sie unter keinen Umständen das Browserfenster oder die Anwendung!", {icon: "tag_faces"}));
}

function showCard(index) {
    var isCorrect;

    cards[index].show();

    if (cards[index].isCorrect) {
        isCorrect = cards[index].isCorrect;
    }

    //activate buttons for switching cards, choose the right cases
    let prevCard = cards[index - 1],
        nextCard = cards[index + 1];
  
    if (index <= 1) {
        view.updateUI(cards[index].controlType, false, nextCard.viewable, isCorrect, cards[index].type);
    } else if (index === cards.length - 2) {
        if(prevCard.controlType === "wait") {
            prevCard = cards[index - 2];
        }
        if(nextCard.controlType === "wait") {
            nextCard = cards[index + 2];
        }
        view.updateUI(cards[index].controlType, prevCard.viewable, false, isCorrect, cards[index].type);
    } else {
        if(prevCard.controlType === "wait") {
            prevCard = cards[index - 2];
        }
        if(nextCard.controlType === "wait") {
            nextCard = cards[index + 2];
        }
        view.updateUI(cards[index].controlType, prevCard.viewable, nextCard.viewable, isCorrect, cards[index].type);
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

        //disable/enable forwarding by pressing "END"
        if(cards[activeIndex].controlType === "discussion" || cards[activeIndex].controlType === "reveal" || cards[activeIndex].controlType === "wait") {
            isForwardable = true;
        } else {
            isForwardable = false;
        }
    } else {
        endSurvey();
    }
}

function endSurvey() {
    //add code here
}

//event handler
function onPrev() {
    Logger.addLog("previousClicked");
    Animation.click(prev);
    if(cards[activeIndex - 1].controlType === "wait") {
        activeIndex -= 2;
        hideCardRight(activeIndex + 2);
    } else {
        activeIndex--;
        hideCardRight(activeIndex + 1);
    }
    showCard(activeIndex);
}

function onNext() {
    Logger.addLog("nextClicked");
    Animation.click(next);
    if(cards[activeIndex + 1].controlType === "wait") {
        activeIndex += 2;
        hideCardLeft(activeIndex - 2);
    } else {
        activeIndex++;
        hideCardLeft(activeIndex - 1);
    }
    showCard(activeIndex);
}

function onCorrect() {
    Logger.addLog("correctClicked");
    if (!correct.classList.contains("inactive")) {
        Animation.click(correct);
        cards[activeIndex].isCorrect = true;
        endCard();
    }
}

function onIncorrect() {
    Logger.addLog("incorrectClicked");
    if (!incorrect.classList.contains("inactive")) {
        Animation.click(incorrect);
        cards[activeIndex].isCorrect = false;
        endCard();
    }
}

function onSubmit() {
    Logger.addLog("submitClicked");
    Animation.click(submit);
    endCard();
}

init();