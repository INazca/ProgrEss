/* eslint-disable no-underscore-dangle */
/* eslint-env browser */
import Controller from "../Controller.js";
import EditorView from "../../views/subviews/EditorView.js";
import Logger from "../../utils/Logger.js";

class MicrotaskReveal extends Controller {

    constructor(data) {
        super(data, new EditorView(`<div class="reveal-font-color">Lösung zur Aufgabe</div>` + data.task, data.solution, false, data.controlType));
    }

    show() {
        this.view.showCard();
        if (!this.initialized) {
            this.view.initEditor();
            this.view.editorStyle = "editor-solution";
            this.initialized = true;
        }
    }

    end() {
        this.view.hideCardLeft();
        Logger.addLog("microtaskEnd");
    }
}

export default MicrotaskReveal;