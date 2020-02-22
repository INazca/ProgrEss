/* eslint-disable no-underscore-dangle */
/* eslint-env browser */

class TypeDetermination {

    constructor(code, highlight, waitTime, evaluations, histogramm, solution){
        this.task = "Bestimmen Sie den Typ des Rückgabewertes für die im Code markierte Stelle!";
        this.solve = new TypeSolve(this.task, code, highlight, waitTime);
        this.evaluate = [];
        evaluations.forEach(evaluation => {
            this.evaluate.push(new TypeEvaluate(this.task, code, highlight, evaluation));
        });
        this.discussion = new TypeDiscussion(this.task, code, histogramm);
        this.reveal = new TypeReveal(this.task, code, highlight, solution);

        this.typeData = {
            type: "type",
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
        return [this._highlight];
    }

    set controlType(type) {
        this._controlType = type;
    }
}

class TypeEvaluate {

}

class TypeDiscussion {

}

class TypeReveal {

}

export default TypeDetermination;