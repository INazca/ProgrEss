/* eslint-disable no-underscore-dangle */
/* eslint-env browser */
import Controller from "../Controller.js";
import EditorDeterminationView from "../../views/subviews/EditorDeterminationView.js";
import Animation from "../../utils/Animation.js";
import Logger from "../../utils/Logger.js";

class TypeSolve extends Controller {

    constructor(data) {
        super(data, new EditorDeterminationView(data.task, data.code, data.controlType));

        this.isLegal = true;

        this.legalButton = this.view.legalButton;
        this.illegalButton = this.view.illegalButton;

        this.legalButton.addEventListener("click", onLegal.bind(this, this.view));
        this.illegalButton.addEventListener("click", onIllegal.bind(this, this.view));
    }

    show() {
        this.view.showCard();
        if (!this.initialized) {
            this.view.initEditor();

            // add legends and highlight to card
            this.view.drawMark(this.data.highlight, "highlighted");
            this.initialized = true;
        } else {
            this.view.showEditedBy();
        }
    }

    end() {
        this._viewable = true;
        this.view.hideCardLeft();
        this.view.addEditedBy("deine Lösung");
        this.view.editable = false;
        this.data.controlType = this.data.controlType + "-done";
        this.data.submition = {
            isLegal: this.isLegal,
            type: this.view.input,
        };
    }
}

function onLegal(view) {
    Logger.addLog("legalClicked");
    Animation.click(this.legalButton);
    view.enableForm();
    this.isLegal = true;
}

function onIllegal(view) {
    Logger.addLog("illegalClicked");
    Animation.click(this.illegalButton);
    view.disableForm();
    this.isLegal = false;
}

export default TypeSolve;