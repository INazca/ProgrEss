/* eslint-env browser */
import Controller from "../Controller.js";
import HistogrammView from "../../views/subviews/HistogrammView.js";

class TypeDiscussion extends Controller {

    constructor(data) {
        super(data, new HistogrammView(data.task, data.expression, data.histogramm));
    }

    show() {
        this.view.showCard();
        if (!this.initialized) {
            // show highlight
            this.view.drawHistogramm();
            this.initialized = true;
        }
    }
}

export default TypeDiscussion;