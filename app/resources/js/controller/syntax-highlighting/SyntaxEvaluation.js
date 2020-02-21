/* eslint-env browser */
import SyntaxMark from "../../controller/syntax-highlighting/SyntaxMark.js";

class SyntaxEvaluation extends SyntaxMark {

    constructor(data) {
        super(data);

        this.show = function () {
            this.view.showCard();
            if (!this.initialized) {
                this.view.initEditor();
                //add highlights to view
                highlight(this.view, this.data.highlights);
                this.initialized = true;
            }
        };
    }
}

function highlight(view, highlights) {
    highlights.forEach(highlight => {
        view.highlight(highlight);
    });
}

export default SyntaxEvaluation;