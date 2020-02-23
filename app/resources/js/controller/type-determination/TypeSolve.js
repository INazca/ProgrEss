/* eslint-disable no-underscore-dangle */
/* eslint-env browser */
import Controller from "../Controller.js";
import EditorDeterminationView from "../../views/subviews/EditorDeterminationView.js";

class TypeSolve extends Controller {

    constructor(data) {
        super(data, new EditorDeterminationView(data.task, data.code));

        this.isLegal = true;

        this.show = function () {
            this.view.showCard();
            if (!this.initialized) {
                this.view.initEditor();

                // add legends and highlight to card
                this.view.drawMark(this.data.highlight, "highlighted");
                this.initialized = true;
            }
        };

        this.end = function () {
            this._viewable = true;
            this.view.hideCardLeft();
            this.view.editable = false;
            this.data.controlType = this.data.controlType + "-done";
            this.data.submition = {
                isLegal: this.isLegal,
                type: this.view.input,
            };
        };

        this.legalButton = this.view.legalButton;
        this.illegalButton = this.view.illegalButton;

        this.legalButton.addEventListener("click", onLegal.bind(this, this.view));
        this.illegalButton.addEventListener("click", onIllegal.bind(this, this.view));
    }
}

function onLegal(view) {
    view.showForm();
    this.isLegal = true;
}

function onIllegal(view) {
    view.hideForm();
    this.isLegal = false;
}

export default TypeSolve;