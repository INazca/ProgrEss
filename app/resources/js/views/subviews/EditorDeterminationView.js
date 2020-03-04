/* eslint-disable no-underscore-dangle */
/* eslint-env browser */
import EditorView from "../subviews/EditorView.js";
import Animation from "../../utils/Animation.js";

var template = "type-determination-solve";

class EditorDeterminationView extends EditorView {

    constructor(task, code, type) {
        super(task, code, true, type, template);

        this.form = this.card.getElementsByClassName("form-group")[0];
        this._input = this.card.getElementsByClassName("type-input")[0];
        this._legalButton = this.card.getElementsByClassName("expression-legal")[0];
        this._illegalButton = this.card.getElementsByClassName("expression-illegal")[0];
    }

    enableForm() {
        this._input.disabled = false;
        this._input.value = "";
        this._legalButton.classList.add("btn-primary-color-active");
        this._illegalButton.classList.remove("btn-primary-color-active");
    }

    disableForm() {
        this._input.disabled = true;
        this._input.value = "unzulässig";
        this._illegalButton.classList.add("btn-primary-color-active");
        this._legalButton.classList.remove("btn-primary-color-active");
    }

    get legalButton() {
        return this._legalButton;
    }

    get illegalButton() {
        return this._illegalButton;
    }

    get input() {
        return this._input.value;
    }

    set editable(isEditable) {
        this._legalButton.disabled = !isEditable;
        this._illegalButton.disabled = !isEditable;
        this._input.disabled = !isEditable;
    }
}

export default EditorDeterminationView;