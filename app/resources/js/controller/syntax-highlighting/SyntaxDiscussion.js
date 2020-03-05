/* eslint-env browser */
import Controller from "../Controller.js";
import EditorAnalyseView from "../../views/subviews/EditorAnalyseView.js";

class SyntaxDiscussion extends Controller {

    constructor(data) {
        super(data, new EditorAnalyseView(data.task, data.code, data.controlType));

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
        heatmap[key].forEach(line => {
            view.drawLineMark(line, "heat-light");
        });
        if(key === "medium" || key === "strong") {
            heatmap[key].forEach(line => {
                view.drawLineMark(line, "heat-medium");
            });
        }
        if(key === "strong") {
            heatmap[key].forEach(line => {
                view.drawLineMark(line, "heat-strong");
            });
        }
    });
    view.showHeatmap();
}

export default SyntaxDiscussion;