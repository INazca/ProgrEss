/* eslint-env browser */
import Controller from "../Controller.js";
import EditorAnalyseView from "../../views/subviews/EditorAnalyseView.js";

class SyntaxDiscussion extends Controller {

    constructor(data) {
        super(data, new EditorAnalyseView(data.task, data.code, true));

        this.show = function () {
            this.view.showCard();
            if (!this.initialized) {
                this.view.initEditor();

                // add legends and highlight to card
                this.view.addLegend();
                heatmap(this.view, this.data.heatmap);
                this.initialized = true;
            }
        };
    }
}

function heatmap(view, heatmap) {
    Object.keys(heatmap).forEach(function(key) {
        heatmap[key].forEach(selection => {
            view.drawMark(selection, "heat-" + key);
        });
    });
    view.showHeatmap();
}

export default SyntaxDiscussion;