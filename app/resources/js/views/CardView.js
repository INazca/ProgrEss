/* eslint-disable no-underscore-dangle */
/* eslint-env browser */

class CardView {
    
    constructor(task, template) {
        this.template = template;
        
        //create card as div node with correct data (not added to HTML)
        this.card = initCard(task, document.getElementById(this.template));
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

function initCard(task, template) {
    var card = template.cloneNode(true);

    //add survey-card class and enable visibility, but card is not visible yet, because its not embedded in the HTML structure
    card.classList.add("survey-card");
    card.classList.remove("hidden");

    //add the task description to the node
    card.getElementsByClassName("task-description")[0].innerHTML = task;

    return card;
}

export default CardView;