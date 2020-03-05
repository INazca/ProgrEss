/* eslint-disable no-underscore-dangle */
/* eslint-env browser */
import Controller from "../../controller/Controller.js";
import EditorMarkView from "../../views/subviews/EditorMarkView.js";
import Animation from "../../utils/Animation.js";

class SyntaxMark extends Controller {

    constructor(data, task) {
        super(data, new EditorMarkView(task || data.task, data.code, data.controlType));

        //register listener for highlight changes
        this.view.addEventListener("highlightsChanged", onHighlightsChanged.bind(this, this.view));
    }

    show() {
        this.view.addHint("Um eine Zeile zu markieren wählen Sie das jeweilige Kästchen der Zeile aus");
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

//update the highlight Array of the SyntaxSolve data model
function onHighlightsChanged(view) {
    var marks = view.highlights,
        highlights = [];

    marks.forEach(mark => {
        highlights.push(mark.find());
    });
    
    this.data.highlights = highlights;
}

export default SyntaxMark;