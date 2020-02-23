/* eslint-disable no-underscore-dangle */
/* eslint-env browser */
import EditorView from "../subviews/EditorView.js";

var template = "type-determination-evaluate";

class EditorSolutionView extends EditorView {

    constructor(task, code, solution) {
        super(task, code, true, template);

        this.solution = this.card.getElementsByClassName("solution-display")[0];
        this.solution.value = solution;
    }
}

export default EditorSolutionView;