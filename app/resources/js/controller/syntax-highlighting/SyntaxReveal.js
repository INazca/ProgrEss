/* eslint-env browser */
import Controller from "../Controller.js";
import EditorAnalyseView from "../../views/subviews/EditorAnalyseView.js";
import Logger from "../../utils/Logger.js";

class SyntaxReveal extends Controller {

    constructor(data) {
        super(data, new EditorAnalyseView(`<div class="reveal-font-color">Lösung zur Aufgabe</div>` + data.task, data.code, data.controlType));

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

    end() {
        this.view.hideCardLeft();
        Logger.addLog("syntaxEnd");
    }
}

function solution(view, solution) {
    solution.forEach(line => {
        view.drawLineMark(line, "solution-mark");
    });

    view.showSolution();
}

export default SyntaxReveal;