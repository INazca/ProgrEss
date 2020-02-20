/* eslint-disable no-underscore-dangle */
/* eslint-env browser */
import SyntaxView from "../views/subviews/SyntaxView.js";

class SyntaxController {

    constructor(data) {
        this.data = data;
        this.view = new SyntaxView(this.data.task, this.data.code);

        //register control buttons for this card
        this.highlightButton = this.view.highlightButton;
        this.eraseButton = this.view.eraseButton;

        //register listeners for controller
        this.highlightButton.addEventListener("click", onHighlight.bind(this, this.view));
        this.eraseButton.addEventListener("click", onErase.bind(this, this.view));
    } 

    start() {
        this.view.showCard();
    }

    end() {
        this.view.hideCard();
    }

    get node() {
        return this.view.node;
    }

    get controlType() {
        return this.data.controlType;
    }
}

//event handlers
function onHighlight(view) {
    var selections = view.selections;

    selections.forEach(selection => {
        view.highlight(selection);
    });

    updateHighlights(this, view);
}

function onErase(view) {
    var selections = view.selections;

    selections.forEach(selection => {
        view.erase(selection);
    });

    updateHighlights(this, view);
}

//update the highlight Array of the SyntaxSolve data model
function updateHighlights(self, view) {
    var marks = view.highlights,
        highlights = [];

    marks.forEach(mark => {
        highlights.push(mark.find());
    });

    self.data.highlights = highlights;
}

export default SyntaxController;