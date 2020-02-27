/* eslint-env browser */
import Controller from "../Controller.js";
import EditorSolutionView from "../../views/subviews/EditorSolutionView.js";

class TypeReveal extends Controller {

    constructor(data) {
        super(data, new EditorSolutionView(data.task, data.code, data.solution, data.controlType));
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
}

export default TypeReveal;