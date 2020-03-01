/* eslint-disable no-underscore-dangle */
/* eslint-env browser */
import Controller from "../Controller.js";
import EditorSolutionView from "../../views/subviews/EditorSolutionView.js";

class TypeEvaluation extends Controller {

    constructor(data) {
        super(data, new EditorSolutionView(`<div class="evaluate-font-color">Verbessern Sie wenn nötig die folgende Lösung zu: </div>` + data.task, data.code, data.evaluation.type, data.controlType));

        this._isCorrect = true;
    }

    show() {
        this.view.showCard();
        if (!this.initialized) {
            this.view.initEditor();

            // show highlight
            this.view.drawMark(this.data.highlight, "highlighted");
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

export default TypeEvaluation;