/* eslint-disable no-underscore-dangle */
/* eslint-env browser */
import EditorView from "../subviews/EditorView.js";

var template = "syntax-highlighting-solve";

class EditorMarkView extends EditorView {

    constructor(task, code, type) {
        super(task, code, true, type, template);

        this._highlightButton = this.card.getElementsByClassName("highlight-tool")[0];
        this._eraseButton = this.card.getElementsByClassName("erase-tool")[0];
        adjustColor(this._highlightButton, this._eraseButton, type);
    }

    highlight(selection) {
        var marks = this.editor.findMarks(selection.anchor, selection.head);

        //check if marks would cross another, if so then connect to a new mark complemented by the selection
        if(marks.length === 0) {
            this.editor.markText(selection.anchor, selection.head, {className: "highlighted"});
        } else {
            let mark = marks[0],
                markDimensions = mark.find();

            if (isBefore(selection.anchor, markDimensions.from) && isAfter(selection.head, markDimensions.to)) {
                mark.clear();
                this.editor.markText(selection.anchor, selection.head, {className: "highlighted"});
            } else if(isBefore(selection.anchor, markDimensions.from)) {
                let markEnd = markDimensions.to;

                mark.clear();
                this.editor.markText(selection.anchor, markEnd, {className: "highlighted"});
            } else if(isAfter(selection.head, markDimensions.to)) {
                let markStart = markDimensions.from;

                mark.clear();
                this.editor.markText(markStart, selection.head, {className: "highlighted"});
            }
        }
    }

    erase(selection) {
        var marks = this.editor.findMarks(selection.anchor, selection.head);

        if(marks.length > 0) {
            let mark = marks[0],
                markDimensions = mark.find();

            if (isBefore(selection.anchor, markDimensions.from) && isAfter(selection.head, markDimensions.to)) {
                mark.clear();
            } else if(isBefore(selection.anchor, markDimensions.from)) {
                let markEnd = markDimensions.to;

                mark.clear();
                this.editor.markText(selection.head, markEnd, {className: "highlighted"});
            } else if(isAfter(selection.head, markDimensions.to)) {
                let markStart = markDimensions.from;

                mark.clear();
                this.editor.markText(markStart, selection.anchor, {className: "highlighted"});
            } else if(isBetween({from: selection.anchor, to: selection.head}, markDimensions)) {
                let markStart = markDimensions.from,
                    markEnd = markDimensions.to;

                mark.clear();
                this.editor.markText(markStart, selection.anchor, {className: "highlighted"});
                this.editor.markText(selection.head, markEnd, {className: "highlighted"});
            }
        }
    }

    set editable(isEditable) {
        this._highlightButton.disabled = !isEditable;
        this._eraseButton.disabled = !isEditable;
    }

    get highlightButton() {
        return this._highlightButton;
    }

    get eraseButton() {
        return this._eraseButton;
    }

    get selections() {
        return this.editor.listSelections();
    }

    get highlights() {
        return this.editor.getAllMarks();
    }
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

function adjustColor(button1, button2, type) {
    button1.classList.add(type + "-color-btn");
    button2.classList.add(type + "-color-btn");
}

export default EditorMarkView;