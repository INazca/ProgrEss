/* eslint-env browser */
import Controller from "../Controller.js";
import HistogrammView from "../../views/subviews/HistogrammView.js";

class TypeDiscussion extends Controller {

    constructor(data) {
        super(data, new HistogrammView(`<div class="discussion-font-color">Statistiken zu den Abgaben</div>` + data.task, data.expression, data.histogramm, data.controlType));
    }

    show() {
        this.view.showCard();
        if (!this.initialized) {
            // show histogramm and legend
            this.view.drawHistogramm();
            this.view.addLegend();
            this.initialized = true;
        }
    }
}

export default TypeDiscussion;