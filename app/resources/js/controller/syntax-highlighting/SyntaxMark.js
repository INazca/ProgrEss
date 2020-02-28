/* eslint-disable no-underscore-dangle */
/* eslint-env browser */
import Controller from "../../controller/Controller.js";
import EditorMarkView from "../../views/subviews/EditorMarkView.js";
import Animation from "../../utils/Animation.js";

class SyntaxMark extends Controller {

    constructor(data) {
        super(data, new EditorMarkView(data.task, data.code, data.controlType));

        //register control buttons for this card
        this.highlightButton = this.view.highlightButton;
        this.eraseButton = this.view.eraseButton;

        //register listeners for controller
        this.highlightButton.addEventListener("click", onHighlight.bind(this, this.view));
        this.eraseButton.addEventListener("click", onErase.bind(this, this.view));
    }

    show() {
        this.view.showCard();
        if (!this.initialized) {
            this.view.initEditor();
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
    }
}

//event handlers
function onHighlight(view) {
    var selections = view.selections;

    Animation.click(this.highlightButton);

    selections.forEach(selection => {
        view.highlight(selection);
    });

    updateHighlights(this, view);
}

function onErase(view) {
    var selections = view.selections;

    Animation.click(this.eraseButton);

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

export default SyntaxMark;