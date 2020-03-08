/* eslint-env browser */
import Controller from "../Controller.js";
import EditorSolutionView from "../../views/subviews/EditorSolutionView.js";
import Logger from "../../utils/Logger.js";

class TypeReveal extends Controller {

    constructor(data) {
        super(data, new EditorSolutionView(`<div class="reveal-font-color">Lösung zur Aufgabe</div>` + data.task, data.code, data.solution.type, data.controlType, data.solution.isLegal));
    }

    show() {
        this.view.showCard();
        if (!this.initialized) {
            this.view.initEditor();

            // show highlight
            this.view.drawMark(this.data.highlight, "highlighted");

            // set look of input
            this.view.setStyle();
            this.initialized = true;
        }
    }

    end() {
        this.view.hideCardLeft();
        Logger.addLog("typeEnd");
    }
}

export default TypeReveal;