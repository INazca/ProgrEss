/* eslint-disable no-underscore-dangle */
/* eslint-env browser */
import Controller from "../Controller.js";
import EditorView from "../../views/subviews/EditorView.js";

class MicrotaskEvaluation extends Controller {

    constructor(data) {
        super(data, new EditorView(data.task, data.evaluation.code, true, data.controlType));

        this._isCorrect = true;
    }

    show() {
        this.view.showCard();
        if (!this.initialized) {
            this.view.initEditor();

            // display the user who edited the shown solution
            this.view.addEditedBy("Lösung von Teilnehmer " + this.data.evaluation.editor);
            this.initialized = true;
        }
    }

    end() {
        this.view.hideCardLeft();
        this._viewable = true;
        this.data.controlType = this.data.controlType + "-done";
        this.data.submition = this._isCorrect;
    }

    get isCorrect() {
        return this._isCorrect;
    }

    set isCorrect(isCorrect) {
        this._isCorrect = isCorrect;
    }
}

export default MicrotaskEvaluation;