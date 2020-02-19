/* eslint-disable no-underscore-dangle */
/* eslint-env browser */

class Syntax {

    constructor(task, code, evaluations, waitTime, highlights, duration, heatmap, solution){
        this.solve = new SyntaxSolve(task, code, waitTime);
        this.evaluate = [];
        for(let i = 0; i < evaluations; i++) {
            this.evaluate.push(new SyntaxEvaluate(task, code, highlights));
        }
        this.discussion = new SyntaxDiscussion(task, code, duration, heatmap);
        this.reveal = new SyntaxReveal(task, code, duration, solution);

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
        this._waitTime = waitTime;
        this._task = task;
        this._code = code;
    }

    get task() {
        return this._task;
    }

    get code() {
        return this._code;
    }
}

class SyntaxEvaluate {

    constructor(task, code, highlights){

    }
}

class SyntaxDiscussion {
    constructor(task, code, duration, heatmap) {

    }
}

class SyntaxReveal {
    constructor(task, code, duration, solution) {

    }
}

export default Syntax;