/* eslint-env browser */
import Controller from "../Controller.js";
import EditorAnalyseView from "../../views/subviews/EditorAnalyseView.js";

class SyntaxReveal extends Controller {

    constructor(data) {
        super(data, new EditorAnalyseView(data.task, data.code, true));

        this.show = function () {
            this.view.showCard();
            if (!this.initialized) {
                this.view.initEditor();

                // show solution
                solution(this.view, this.data.solution);
                this.initialized = true;
            }
        };
    }
}

function solution(view, solution) {
    solution.forEach(selection => {
        view.drawMark(selection, "solution-mark");
    });

    view.showSolution();
}

export default SyntaxReveal;