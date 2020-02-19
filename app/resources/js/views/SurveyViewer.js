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
        this.active = -1;
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

    showCard() {
        var activeCard = this.cards[this.active]
        activeCard.showCard();

        updateUI(this.controls, this)
    }

    nextCard() {
        this.cards[this.active].hideCard();
        this.cards[this.active + 1].showCard();

        this.active++;
    }

    prevCard() {
    }

    clearCards() {

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

function updateHTML(cards) {
    cardsContainer.innerHTML = "";

    cards.forEach(card => {
        cardsContainer.appendChild(card.node);
    });
}

export default SurveyViewer;