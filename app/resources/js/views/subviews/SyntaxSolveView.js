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
        this.highlights = [];

        //register control buttons for this card
        this.highlightButton = this.card.getElementsByClassName("highlight-tool")[0];
        this.eraseButton = this.card.getElementsByClassName("erase-tool")[0];
        
    } 

    showCard() {
        $(this.card).animate({left: 0}, "slow");

        //register editor, highlight and erase listener, must be here, since CodeMirror editor will bug if created in constructor
        this.editor = registerEditor(this.editorContainer, this.code);
        this.highlightButton.addEventListener("click", onHighlight.bind(this, this.editor));
        this.eraseButton.addEventListener("click", onErase.bind(this, this.editor));
    }

    hideCard(){
        $(this.card).animate({left: "-100%"}, "slow");
    }

    get node() {
        return this.card;
    }

    get controlType() {
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

function isBefore(cursor1, cursor2) {
    if(cursor1.line < cursor2.line) {
        return true;
    } else if(cursor1.line === cursor2.line && cursor1.ch < cursor2.ch) {
        return true;
    } 
    return false;
}

function isAfter(cursor1, cursor2) {
    if(cursor1.line > cursor2.line) {
        return true;
    } else if(cursor1.line === cursor2.line && cursor1.ch > cursor2.ch) {
        return true;
    }
    return false;
}

function isBetween(selection1, selection2) {
    if(selection1.from.line >= selection2.from.line && selection1.to.line <= selection2.to.line) {
        if(selection1.from.line > selection2.from.line && selection1.to.line < selection2.to.line) {
            return true;
        } else if(selection1.from.line === selection2.from.line && selection1.to.line === selection2.to.line) {
            if(selection1.from.ch >= selection2.from.ch && selection1.to.ch <= selection2.to.ch) {
                return true;
            }
        } else if(selection1.from.line === selection2.from.line) {
            if(selection1.from.ch >= selection2.from.ch) {
                return true;
            }
        } else if(selection1.to.line === selection2.to.line) {
            if(selection1.to.ch <= selection2.to.ch) {
                return true;
            }
        }
    }
    return false;
}

//event handler
function onHighlight(editor) {
    var selections = editor.listSelections();

    selections.forEach(selection => {
        var marks = editor.findMarks(selection.anchor, selection.head);

        //check if marks would cross another, if so then connect to a new mark complemented by the selection
        if(marks.length === 0) {
            editor.markText(selection.anchor, selection.head, {className: "highlighted"});
        } else {
            let mark = marks[0],
                markDimensions = mark.find();

            if (isBefore(selection.anchor, markDimensions.from) && isAfter(selection.head, markDimensions.to)) {
                mark.clear();
                editor.markText(selection.anchor, selection.head, {className: "highlighted"});
            } else if(isBefore(selection.anchor, markDimensions.from)) {
                let markEnd = markDimensions.to;

                mark.clear();
                editor.markText(selection.anchor, markEnd, {className: "highlighted"});
            } else if(isAfter(selection.head, markDimensions.to)) {
                let markStart = markDimensions.from;

                mark.clear();
                editor.markText(markStart, selection.head, {className: "highlighted"});
            }
        }
    });

    //get all highlights and add them to the highlight array of the SyntaxSolve-Object
    let allMarks = editor.getAllMarks(),
    highlights = [];

    allMarks.forEach(mark => {
        highlights.push(mark.find());
    });

    this.highlights = highlights;
}

function onErase(editor) {
    var selections = editor.listSelections();

    selections.forEach(selection => {
        var marks = editor.findMarks(selection.anchor, selection.head);

        if(marks.length > 0) {
            let mark = marks[0],
                markDimensions = mark.find();

            if (isBefore(selection.anchor, markDimensions.from) && isAfter(selection.head, markDimensions.to)) {
                mark.clear();
            } else if(isBefore(selection.anchor, markDimensions.from)) {
                let markEnd = markDimensions.to;

                mark.clear();
                editor.markText(selection.head, markEnd, {className: "highlighted"});
            } else if(isAfter(selection.head, markDimensions.to)) {
                let markStart = markDimensions.from;

                mark.clear();
                editor.markText(markStart, selection.anchor, {className: "highlighted"});
            } else if(isBetween({from: selection.anchor, to: selection.head}, markDimensions)) {
                let markStart = markDimensions.from,
                    markEnd = markDimensions.to;

                mark.clear();
                editor.markText(markStart, selection.anchor, {className: "highlighted"});
                editor.markText(selection.head, markEnd, {className: "highlighted"});
            }
        }
    });

    //get all highlights and add them to the highlight array of the SyntaxSolve-Object
    let allMarks = editor.getAllMarks(),
    highlights = [];

    allMarks.forEach(mark => {
        highlights.push(mark.find());
    });

    this.highlights = highlights;
    console.log(this.highlights);
}

export default SyntaxSolveView;