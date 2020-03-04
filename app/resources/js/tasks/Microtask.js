/* eslint-disable no-underscore-dangle */
/* eslint-env browser */

var type = "microtask";

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
            type: type,
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

    get type() {
        return type;
    }

    get waitTime() {
        return this._waitTime;
    }

    set controlType(type) {
        this._controlType = type;
    }

    set submition(submition) {
        this._submition = submition;
    }
}

class MicrotaskEvaluate {
    constructor(task, evaluation) {
        this._controlType = "evaluate";
        this._task = task;
        this._evaluation = evaluation;
        this._isCorrect = true;
    }

    get controlType() {
        return this._controlType;
    }

    get task() {
        return this._task;
    }

    get evaluation() {
        return this._evaluation;
    }

    get type() {
        return type;
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
        this._controlType = "discussion";
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

    get type() {
        return type;
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

    get type() {
        return type;
    }
}

export default Microtask;