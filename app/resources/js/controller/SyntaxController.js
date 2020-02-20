/* eslint-disable no-underscore-dangle */
/* eslint-env browser */
import SyntaxView from "../views/subviews/SyntaxView.js";

class SyntaxController {

    constructor(data) {
        this.data = data;
        this.view = new SyntaxView(this.data.task, this.data.code);
        this._viewable = false;
        this.initialized = false;

        //register control buttons for this card
        this.highlightButton = this.view.highlightButton;
        this.eraseButton = this.view.eraseButton;

        //register listeners for controller
        this.highlightButton.addEventListener("click", onHighlight.bind(this, this.view));
        this.eraseButton.addEventListener("click", onErase.bind(this, this.view));
    } 

    show() {
        this.view.showCard();
        if(!this.initialized) {
            this.view.initEditor();
            this.initialized = true;
        }
    }

    end() {
        this._viewable = true;
        this.view.hideCardLeft();
        this.view.editable = false;
        this.data.controlType = this.data.controlType + "-done";
    }

    hideRight() {
        this.view.hideCardRight();
        this._viewable = true;
    }

    hideLeft() {
        this.view.hideCardLeft();
    }

    get node() {
        return this.view.node;
    }

    get controlType() {
        return this.data.controlType;
    }

    get edited() {
        return this._edited;
    }

    get viewable() {
        return this._viewable;
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