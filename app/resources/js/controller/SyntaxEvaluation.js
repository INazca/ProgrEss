/* eslint-env browser */
import SyntaxController from "../controller/SyntaxController.js";

class SyntaxEvaluation extends SyntaxController{

    constructor(data) {
        super(data);

        this.start = function() {
            //add highlights to view
            this.view.showCard();
            highlight(this.view, this.data.highlights);
        };
    }
}

function highlight(view, highlights) {
    highlights.forEach(highlight => {
        view.highlight(highlight);
    });
}

export default SyntaxEvaluation;