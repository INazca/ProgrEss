/* eslint-disable no-underscore-dangle */
/* eslint-env browser */
import EditorView from "../subviews/EditorView.js";

var template = "type-determination-evaluate";

class EditorSolutionView extends EditorView {

    constructor(task, code, solution, type, isLegal) {
        super(task, code, true, type, template);

        this.type = type;

        // if (type === "evaluate-correctness") {
        //     this.type = "evaluate";
        // }

        this._legalButton = this.card.getElementsByClassName("expression-legal")[0];
        this._illegalButton = this.card.getElementsByClassName("expression-illegal")[0];
        this.solution = this.card.getElementsByClassName("solution-display")[0];
        this.solution.value = solution;
        adjustColor(this.solution, this.type);
        updateButtons(this._legalButton, this._illegalButton, isLegal);
    }

    setStyle() {
        this.solution.classList.add("input-solution");
    }
}

function adjustColor(solution, type) {
    solution.classList.add(type + "-color");
}

function updateButtons(legalButton, illegalButton, isLegal) {
    legalButton.disabled = true;
    illegalButton.disabled = true;

    if(isLegal) {
        legalButton.classList.add("btn-primary-color-active");
    } else {
        illegalButton.classList.add("btn-primary-color-active");
    }
}

export default EditorSolutionView;