/* eslint-disable no-underscore-dangle */
/* eslint-env browser */
import SyntaxMark from "../../controller/syntax-highlighting/SyntaxMark.js";

class SyntaxEvaluation extends SyntaxMark {

    constructor(data) {
        super(data, `<div class="evaluate-font-color">Bewerten Sie die Lösung von Teilnehmer ${data.highlights.editor}</div>` + data.task);
    }

    show() {
        this.view.showCard();
            if (!this.initialized) {
                this.view.initEditor();

                //add highlights to view
                highlight(this.view, this.data.highlights.list);
                this.view.editable = false;
                this.view.addEditedBy("Lösung von Teilnehmer " + this.data.highlights.editor);
                this.initialized = true;
            }
    }

    end() {
        this._viewable = true;
        this.view.hideCardLeft();
        this.view.editable = false;
        this.data.controlType = this.data.controlType + "-done";
    }
}

function highlight(view, highlights) {
    highlights.forEach(highlight => {
        view.highlight(highlight);
    });
}

export default SyntaxEvaluation;