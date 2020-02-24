/* eslint-disable no-underscore-dangle */
/* eslint-env browser */

class Microtask {

    constructor(task, code, waitTime, evaluations, discussionSolutions, solution){
        this.solve = new MicrotaskSolve(task, code, waitTime);
        this.evaluate = [];
        evaluations.forEach(evaluation => {
            this.evaluate.push(new MicrotaskEvaluate(task, evaluation));
        });
        this.discussion = new MicrotaskDiscussion(task, discussionSolutions);
        this.reveal = new MicrotaskReveal(task, solution);

        this.typeData = {
            type: "microtask",
            solve: this.solve,
            evaluate: this.evaluate,
            discussion: this.discussion,
            reveal: this.reveal,
        };
    }

    get data() {
        return this.typeData;
    }
}

class MicrotaskSolve {
    constructor(task, code, waitTime) {
        this._controlType = "solve";
        this._waitTime = waitTime;
        this._task = task;
        this._code = code;
        this._submition = "";
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

    set submition(submition) {
        this._submition = submition;
    }
}

class MicrotaskEvaluate {
    constructor(task, code) {
        this._controlType = "evaluate-correctness";
        this._task = task;
        this._code = code;
        this._isCorrect = true;
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

    set isCorrect(isCorrect) {
        this._isCorrect = isCorrect;
    }
}

class MicrotaskDiscussion {
    constructor(task, discussionSolutions) {
        this._controlType = "discuss";
        this._task = task;
        this._discussionSolutions = discussionSolutions;
    }

    get controlType() {
        return this._controlType;
    }

    get task() {
        return this._task;
    }

    get discussionSolutions() {
        return this._discussionSolutions;
    }
}

class MicrotaskReveal {
    constructor(task, solution) {
        this._controlType = "reveal";
        this._task = task;
        this._solution = solution;
    }

    get controlType() {
        return this._controlType;
    }

    get task() {
        return this._task;
    }

    get solution() {
        return this._solution;
    }
}

export default Microtask;