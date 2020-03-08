/* eslint-disable no-underscore-dangle */
/* eslint-env browser */
import EditorView from "../subviews/EditorView.js";

var template = "microtask-discussion";

class EditorDeterminationView extends EditorView {

    constructor(task, discussionSolutions, type) {
        super(task, discussionSolutions[0].code, true, type, template);

        this.code2 = discussionSolutions[1].code;
        this.solutions = discussionSolutions;

        this.editorContainer2 = this.card.getElementsByClassName("editor-container")[1];
        this.progressBars = this.card.getElementsByClassName("progress-bar");

        adjustColor(this.editorContainer, this.editorContainer2);
    }

    initEditor(){
        this.editor = registerEditor(this.editorContainer, this.code, true);
        this.editor2 = registerEditor(this.editorContainer2, this.code2, true);
    }

    initCorrectness() {
        this.progressBars[0].innerHTML = this.solutions[0].percentage + "% korrekt gewertet";
        $(this.progressBars[0]).animate({width: this.solutions[0].percentage + "%"}, 2000);

        this.progressBars[1].innerHTML = this.solutions[1].percentage + "% korrekt gewertet";
        $(this.progressBars[1]).animate({width: this.solutions[1].percentage + "%"}, 2000);
    }
}

function registerEditor(element, code, readOnly) {
    var editor = CodeMirror(element, {
        value: code,
        mode: "text/x-java",
        readOnly: readOnly,
        indentUnit: 4,
    });

    return editor;
}

function adjustColor(container1, container2) {
    container1.classList.add("reveal-color");
    container2.classList.add("discussion-color");
}

export default EditorDeterminationView;