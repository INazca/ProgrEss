/* eslint-disable no-underscore-dangle */
/* eslint-env browser */
var taskType = "syntax-highlighting-solve";

class SyntaxSolveView {

    constructor(task, code) {
        this._controlType = "solve";
        this.template = document.getElementById(taskType);
        this.card = createCard(this.template);
        this.editorContainer = this.card.getElementsByClassName("editor-container")[0];
        this.task = task;
        this.code = code;

        //register control buttons for this card
        this.highlightButton = this.card.getElementsByClassName("highlight-tool");
        this.eraseButton = this.card.getElementsByClassName("erase-tool");
    } 

    showCard() {
        $(this.card).animate({left: 0}, "slow");
        this.editor = registerEditor(this.editorContainer, this.code);
    }

    hideCard(){
        $(this.card).animate({left: "-100%"}, "slow");
    }

    get node() {
        return this.card;
    }

    get controltype() {
        return this._controlType;
    }
}

function createCard(template) {
    var card = template.cloneNode(true);

    card.classList.add("survey-card");
    card.classList.remove("hidden");

    return card;
}

function registerEditor(element, code) {
    var editor = CodeMirror(element, {
        value: code,
        mode: "text/x-java",
        readOnly: true,
    });

    return editor;
}

export default SyntaxSolveView;