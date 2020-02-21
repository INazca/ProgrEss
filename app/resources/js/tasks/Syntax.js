/* eslint-disable no-underscore-dangle */
/* eslint-env browser */

class SyntaxHighlighting {

    constructor(task, code, waitTime, evaluationHighlights, heatmap, solution){
        this.solve = new SyntaxSolve(task, code, waitTime);
        this.evaluate = [];
        evaluationHighlights.forEach(highlights => {
            this.evaluate.push(new SyntaxEvaluate(task, code, highlights));
        });
        this.discussion = new SyntaxDiscussion(task, code, heatmap);
        this.reveal = new SyntaxReveal(task, code, solution);

        this.syntaxData = {
            type: "syntax",
            solve: this.solve,
            evaluate: this.evaluate,
            discussion: this.discussion,
            reveal: this.reveal,
        };
    }

    get data() {
        return this.syntaxData;
    }
}

class SyntaxSolve {

    constructor(task, code, waitTime) {
        this._controlType = "solve";
        this._waitTime = waitTime;
        this._task = task;
        this._code = code;
        this._highlights = [];
    }

    get controlType() {
        return this._controlType;
    }

    get task() {
        return this._task;
    }

    get code() {
        return this._code;
    }

    set controlType(type) {
        this._controlType = type;
    }

    set highlights(highlights) {
        this._highlights = highlights;
    }
}

class SyntaxEvaluate {

    constructor(task, code, highlights){
        this._controlType = "evaluate";
        this._task = task;
        this._code = code;
        this._highlights = highlights;
    }

    get controlType() {
        return this._controlType;
    }

    get task() {
        return this._task;
    }

    get code() {
        return this._code;
    }

    get highlights() {
        return this._highlights;
    }

    set controlType(type) {
        this._controlType = type;
    }

    set highlights(highlights) {
        this._highlights = highlights;
    }
}

class SyntaxDiscussion {
    constructor(task, code, heatmap) {
        this._controlType = "none";
        this._task = task;
        this._code = code;
        this._heatmap = heatmap;
    }

    get controlType() {
        return this._controlType;
    }

    get task() {
        return this._task;
    }

    get code() {
        return this._code;
    }

    get heatmap() {
        return this._heatmap;
    }
}

class SyntaxReveal {
    constructor(task, code, solution) {

    }
}

export default SyntaxHighlighting;