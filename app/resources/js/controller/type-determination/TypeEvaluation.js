/* eslint-disable no-underscore-dangle */
/* eslint-env browser */
import Controller from "../Controller.js";
import EditorSolutionView from "../../views/subviews/EditorSolutionView.js";

class TypeEvaluation extends Controller {

    constructor(data) {
        super(data, new EditorSolutionView(data.task, data.code, data.evaluation));

        this._isCorrect = true;

        this.show = function () {
            this.view.showCard();
            if (!this.initialized) {
                this.view.initEditor();

                // show highlight
                this.view.drawMark(this.data.highlight, "highlighted");
                this.initialized = true;
            }
        };

        this.end = function () {
            this.view.hideCardLeft();
            this._viewable = true;
            this.data.controlType = this.data.controlType + "-done";
            this.data.submition = this._isCorrect;
        };
    }

    get isCorrect() {
        return this._isCorrect;
    }

    set isCorrect(isCorrect) {
        this._isCorrect = isCorrect;
    }
}

export default TypeEvaluation;