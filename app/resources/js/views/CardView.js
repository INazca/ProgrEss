import { Event, Observable } from "../utils/Observable.js";

/* eslint-disable no-underscore-dangle */
/* eslint-env browser */

class CardView extends Observable{

    constructor(task, type, template) {
        super();
        this.template = template;
        this.type = type;

        console.log(this.template);
        
        if (type === "evaluate-correctness") {
            this.type = "evaluate";
        }

        //create card as div node with correct data (not added to HTML)
        this.card = initCard(task, document.getElementById(this.template), this.type);
        this.taskDescription = this.card.getElementsByClassName("task-description")[0];
    }

    showCard() {
        $(this.card).animate({ left: 0 }, "slow");
    }

    hideCardLeft() {
        $(this.card).animate({ left: "-100%" }, "slow");
    }

    hideCardRight() {
        $(this.card).animate({ left: "100%" }, "slow");
    }

    fadeInCard() {
        $(this.card).show("fade", 1000);
    }

    fadeOutCard() {
        $(this.card).hide("fade", 2000);
    }

    addEditedBy(editor) {
        var display = document.createElement("div");

        display.classList.add("edited-by");
        display.classList.add(this.type + "-color");
        if (editor === "deine Lösung") {
            display.classList.add("hidden");
        }

        display.innerHTML = `<i class="material-icons md-light">person</i><span class="text">: ${editor}</span>`;

        this.card.getElementsByClassName("card-content")[0].append(display);

        this.editedBy = display;
    }

    showEditedBy() {
        this.editedBy.classList.remove("hidden");
    }

    addHint(hint) {
        var hintEl = document.createElement("small");

        hintEl.classList.add("text-muted");
        hintEl.innerHTML = hint;

        this.taskDescription.parentNode.insertBefore(hintEl, this.taskDescription.nextSibling);
    }

    get node() {
        return this.card;
    }
}

function initCard(task, template, taskType) {
    var card = template.cloneNode(true),
        type = taskType;

    //add survey-card class, but card is not visible yet, because its not embedded in the HTML structure
    card.classList.add("survey-card");
    card.classList.remove("hidden");
 
    if (taskType !== "wait") {
        //adjust colors
        card.getElementsByClassName("card-content")[0].classList.add(type + "-color");
        card.getElementsByClassName("task-description")[0].classList.add(type + "-color");
    } else {
        card.style.display = "none";
    }

    //add the task description to the node
    card.getElementsByClassName("task-description")[0].innerHTML = task;

    if(taskType !== "solve" && taskType !== "wait") {
        card.getElementsByClassName("task-description")[0].classList.add("text-muted");
    }

    return card;
}

export default CardView;