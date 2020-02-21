/* eslint-env browser */
import Controller from "../Controller.js";
import EditorHeatmapView from "../../views/subviews/EditorHeatmapView.js";

class SyntaxDiscussion extends Controller {

    constructor(data) {
        super(data, new EditorHeatmapView(data.task, data.code, true));

        this.show = function () {
            this.view.showCard();
            if (!this.initialized) {
                this.view.initEditor();
                //add highlights to view
                heatmap(this.view, this.data.heatmap);
                this.initialized = true;
            }
        };
    }
}

function heatmap(view, heatmap) {
    Object.keys(heatmap).forEach(function(key) {
        heatmap[key].forEach(selection => {
            view.drawHeat(selection, key);
        });
    });
    view.showHeatmap();
}

export default SyntaxDiscussion;