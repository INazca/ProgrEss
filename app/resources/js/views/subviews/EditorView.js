import CardView from "../CardView.js";
/* eslint-disable no-underscore-dangle */
/* eslint-env browser */

class EditorView extends CardView {
    
    constructor(task, code, readOnly, template) {
        super(task, template || "syntax-highlighting-discussion");

        this.editorContainer = this.card.getElementsByClassName("editor-container")[0];
        this.code = code;
        this.readOnly = readOnly;
    }

    initEditor() {
        this.editor = registerEditor(this.editorContainer, this.code, this.readOnly);
    }

    drawMark(selection, className) {
        this.editor.markText(selection.anchor, selection.head, {className: className});
    }
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