/* eslint-disable no-underscore-dangle */
/* eslint-env browser */
import Controller from "../Controller.js";
import EditorView from "../../views/subviews/EditorView.js";

class MicrotaskReveal extends Controller {

    constructor(data) {
        super(data, new EditorView(data.task, data.solution));
    }

    show() {
        this.view.showCard();
        if (!this.initialized) {
            this.view.initEditor();
            this.view.editorStyle = "editor-solution";
            this.initialized = true;
        }
    }
}

export default MicrotaskReveal;