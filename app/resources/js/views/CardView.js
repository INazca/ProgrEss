/* eslint-disable no-underscore-dangle */
/* eslint-env browser */

class CardView {
    
    constructor(task, type, template) {
        this.template = template;
        
        //create card as div node with correct data (not added to HTML)
        this.card = initCard(task, document.getElementById(this.template), type);
    }

    showCard() {
        $(this.card).animate({left: 0}, "slow");
    }

    hideCardLeft(){
        $(this.card).animate({left: "-100%"}, "slow");
    }

    hideCardRight() {
        $(this.card).animate({left: "100%"}, "slow");
    }

    get node() {
        return this.card;
    }
}

function initCard(task, template, taskType) {
    var card = template.cloneNode(true),
        type = taskType;

    //add survey-card class and enable visibility, but card is not visible yet, because its not embedded in the HTML structure
    card.classList.add("survey-card");
    card.classList.remove("hidden");

    //adjust colors
    if(type === "evaluate-correctness") {
        type = "evaluate";
    }
    card.getElementsByClassName("card-content")[0].classList.add(type + "-color");
    card.getElementsByClassName("task-description")[0].classList.add(type + "-color");

    //add the task description to the node
    card.getElementsByClassName("task-description")[0].innerHTML = task;

    return card;
}

export default CardView;