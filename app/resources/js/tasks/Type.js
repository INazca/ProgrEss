/* eslint-disable no-underscore-dangle */
/* eslint-env browser */

var type = "type";

class TypeDetermination {

    constructor(code, highlight, waitTime, evaluations, expression, histogramm, solution){
        this.task = `Bestimmen Sie, ob folgender markierter Ausdruck zulässig ist, d.h. keine Fehlermeldungen auslöst, und geben Sie,
        sofern dies zutrifft, dessen Rückgabe-Typ an!`;
        this.solve = new TypeSolve(this.task, code, highlight, waitTime);
        this.evaluate = [];
        evaluations.forEach(evaluation => {
            this.evaluate.push(new TypeEvaluate(this.task, code, highlight, evaluation));
        });
        this.discussion = new TypeDiscussion(this.task, expression, histogramm);
        this.reveal = new TypeReveal(this.task, code, highlight, solution);

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

class TypeSolve {
    constructor(task, code, highlight, waitTime) {
        this._controlType = "solve";
        this._waitTime = waitTime;
        this._task = task;
        this._code = code;
        this._highlight = highlight;
        this._submition = {};
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

    get highlight() {
        return this._highlight;
    }

    get type() {
        return type;
    }

    set controlType(type) {
        this._controlType = type;
    }

    set submition(submition) {
        this._submition = submition;
    }
}

class TypeEvaluate {
    constructor(task, code, highlight, evaluation) {
        this._controlType = "evaluate-correctness";
        this._task = task;
        this._code = code;
        this._highlight = highlight;
        this._evaluation = evaluation;
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

    get highlight() {
        return this._highlight;
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

class TypeDiscussion {
    constructor(task, expression, histogramm) {
        this._controlType = "discussion";
        this._task = task;
        this._expression = expression;
        this._histogramm = histogramm;
    }

    get controlType() {
        return this._controlType;
    }

    get task() {
        return this._task;
    }

    get expression() {
        return this._expression;
    }

    get histogramm() {
        return this._histogramm;
    }

    get type() {
        return type;
    }

    set controlType(type) {
        this._controlType = type;
    }
}

class TypeReveal {
    constructor(task, code, highlight, solution) {
        this._controlType = "reveal";
        this._task = task;
        this._code = code;
        this._highlight = highlight;
        this._solution = solution;
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

    get highlight() {
        return this._highlight;
    }

    get solution() {
        return this._solution;
    }

    get type() {
        return type;
    }

    set controlType(type) {
        this._controlType = type;
    }
}

export default TypeDetermination;