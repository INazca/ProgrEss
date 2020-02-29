/* eslint-disable no-underscore-dangle */
/* eslint-env browser */
import EditorView from "../subviews/EditorView.js";

var template = "type-determination-evaluate";

class EditorSolutionView extends EditorView {

    constructor(task, code, solution, type) {
        super(task, code, true, type, template);

        this.type = type;
        if (type === "evaluate-correctness") {
            this.type = "evaluate";
        }

        this.solution = this.card.getElementsByClassName("solution-display")[0];
        this.solution.value = solution;
        adjustColor(this.solution, this.type);
    }

    setStyle() {
        this.solution.classList.add("input-solution");
    }
}

function adjustColor(solution, type) {
    solution.classList.add(type + "-color");
}

export default EditorSolutionView;