/* eslint-disable no-underscore-dangle */
/* eslint-env browser */
import EditorView from "../subviews/EditorView.js";

var template = "type-determination-solve";

class EditorDeterminationView extends EditorView {

    constructor(task, code) {
        super(task, code, true, template);

        this.form = this.card.getElementsByClassName("form-group")[0];
        this._input = this.card.getElementsByClassName("type-input")[0];
        this._legalButton = this.card.getElementsByClassName("expression-legal")[0];
        this._illegalButton = this.card.getElementsByClassName("expression-illegal")[0];
    }

    showForm() {
        $(this.form).show(1000);
    }

    hideForm() {
        $(this.form).hide(1000);
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