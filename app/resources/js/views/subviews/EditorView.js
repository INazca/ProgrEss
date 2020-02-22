/* eslint-disable no-underscore-dangle */
/* eslint-env browser */

class EditorView {
    
    constructor(task, code, readOnly, template) {
        if(!template) {
            this.template = "syntax-highlighting-discussion";
        } else {
            this.template = template;
        }

        //create card as div node with correct data (not added to HTML)
        this.card = initCard(task, document.getElementById(this.template));

        this.editorContainer = this.card.getElementsByClassName("editor-container")[0];
        this.code = code;
        this.readOnly = readOnly;
    }

    initEditor() {
        this.editor = registerEditor(this.editorContainer, this.code, this.readOnly);
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

    drawMark(selection, className) {
        this.editor.markText(selection.anchor, selection.head, {className: className});
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

function registerEditor(element, code, readOnly) {
    var editor = CodeMirror(element, {
        value: code,
        mode: "text/x-java",
        readOnly: readOnly,
    });

    return editor;
}

export default EditorView;