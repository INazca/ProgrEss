import CardView from "../CardView.js";
/* eslint-disable no-underscore-dangle */
/* eslint-env browser */

class EditorView extends CardView {
    
    constructor(task, code, readOnly, type, template) {
        super(task, type, template || "editor-template");

        this.editorContainer = this.card.getElementsByClassName("editor-container")[0];
        this.code = code;
        this.readOnly = readOnly;
    }

    initEditor() {
        this.editor = registerEditor(this.editorContainer, this.code, this.readOnly);
    }

    drawMark(selection, className) {
        this.editor.markText(selection.anchor, selection.head, {className: className, atomic: true});
    }

    drawLineMark(line, className) {
        var tokens = this.editor.getLineTokens(line);
 
        this.drawMark({anchor: {line: line, ch:tokens[0].start}, head: {line: line, ch: tokens[tokens.length-1].end}}, className);
        this.editor.addLineClass(line, "gutter", className);
    }

    get content() {
        return this.editor.getValue();
    }

    set editable(isEditable) {
        this.editor.setOption("readOnly", !isEditable);
    }

    set editorStyle(className) {
        this.card.getElementsByClassName("CodeMirror")[0].classList.add(className);
    }
}

function registerEditor(element, code, readOnly) {
    var editor = CodeMirror(element, {
        value: code,
        mode: "text/x-java",
        readOnly: readOnly,
        lineNumbers: true,
        indentUnit: 4,
        // configureMouse: function(){
        //     return{unit: "word"};
        // },
    });
    return editor;
}

export default EditorView;