/* eslint-disable no-underscore-dangle */
/* eslint-env browser */
import EditorView from "../subviews/EditorView.js";

var template = "microtask-discussion";

class EditorDeterminationView extends EditorView {

    constructor(task, discussionSolutions, type) {
        super(task, discussionSolutions[0], true, type, template);
        this.code2 = discussionSolutions[1];
        this.editorContainer2 = this.card.getElementsByClassName("editor-container")[1];
    }

    initEditor(){
        this.editor = registerEditor(this.editorContainer, this.code, true);
        this.editor2 = registerEditor(this.editorContainer2, this.code2, true);
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

export default EditorDeterminationView;