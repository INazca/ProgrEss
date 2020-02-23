/* eslint-disable no-underscore-dangle */
/* eslint-env browser */
import Controller from "../Controller.js";
import EditorView from "../../views/subviews/EditorView.js";

class MicrotaskSolve extends Controller {

    constructor(data) {
        super(data, new EditorView(data.task, data.code, false));
    }

    show() {
        this.view.showCard();
        if (!this.initialized) {
            this.view.initEditor();
            this.initialized = true;
        }
    }

    end() {
        super.end();
        this._viewable = true;
        this.view.editable = false;
        this.data.controlType = this.data.controlType + "-done";
        this.data.submition = this.view.content;
    }
}

export default MicrotaskSolve;