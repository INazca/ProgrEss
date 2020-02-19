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
        this.isActive = false;
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
    }

    updateUI(type) {
        if(type === "solve") {
            this.controls.prev.classList.add("hidden");
            this.controls.next.classList.add("hidden");
            this.controls.correct.classList.add("hidden");
            this.controls.incorrect.classList.add("hidden");
            this.controls.submit.classList.remove("hidden");
        }
    }

    updateHTML(cards) {
        cardsContainer.innerHTML = "";
    
        cards.forEach(card => {
            cardsContainer.appendChild(card.node);
        });
    }

    prevCard() {
        //write corresponding code here
    }
}

export default SurveyViewer;