import SyntaxSolveView from "../views/subviews/SyntaxSolveView.js";

/* eslint-disable no-underscore-dangle */
/* eslint-env browser */
var cardsContainer = document.getElementById("cards-container");

class SurveyViewer{

    constructor(prev, next, correct, incorrect, submit) {
        this.contentarea = document.getElementsByClassName("content-area")[0];
        this.controls = {
            prev: prev,
            next: next,
            correct: correct,
            incorrect: incorrect,
            submit: submit,
        };
        this.cards = [];
        this.active = 0;
        this.isActive = false;
    }

    createCards(survey){
        survey.forEach(type => {
            var task = type.data;

            //create cards if the task type is syntax highlighting
            if(task.type === "syntax") {
                this.cards.push(new SyntaxSolveView(task.solve.task, task.solve.code));
            }

            //create cards if the task type is type determination
            if(task.type === "type") {
                //write code for instantiation
            }

            //create cards if the task type is microtask
            if(task.type === "micro") {
                //write code for instantiation
            }
        });

        updateHTML(this.cards);
    }

    nextCard() {
        var activeCard = this.cards[this.active],
            nextCard = this.cards[this.active];

        if (this.isActive) {
            activeCard.hideCard();
            nextCard.showCard();
            activeCard = nextCard;
            this.active++;
        } else {
            activeCard.showCard();
            this.isActive = true;
        }

        updateUI(this.controls, activeCard.controlType);
    }

    prevCard() {
    }

    clearCards() {

    }
}

function updateHTML(cards) {
    cardsContainer.innerHTML = "";

    cards.forEach(card => {
        cardsContainer.appendChild(card.node);
    });
}

function updateUI(controls, type) {
    if(type === "solve") {
        controls.prev.classList.add("hidden");
        controls.next.classList.add("hidden");
        controls.correct.classList.add("hidden");
        controls.incorrect.classList.add("hidden");
        controls.submit.classList.remove("hidden");
    }
}

export default SurveyViewer;