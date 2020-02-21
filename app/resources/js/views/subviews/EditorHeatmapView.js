/* eslint-env browser */
import EditorView from "../subviews/EditorView.js";

class EditorHeatmapView extends EditorView {

    constructor(task, code) {
        super(task, code, true);
    }

    drawHeat(selection, weight) {
        this.editor.markText(selection.anchor, selection.head, {className: "heat-" + weight});
    }

    showHeatmap() {
        var lights = this.card.getElementsByClassName("heat-light"),
            mediums = this.card.getElementsByClassName("heat-medium"),
            strongs = this.card.getElementsByClassName("heat-strong"),
            duration = 2000;

        for(let i = 0; i < lights.length; i++) {
            $(lights[i]).animate({backgroundColor: "#ffeda0", color: "black"}, duration);
        }

        for(let i = 0; i < mediums.length; i++) {
            $(mediums[i]).animate({backgroundColor: "#feb24c", color: "black"}, duration);
        }

        for(let i = 0; i < strongs.length; i++) {
            $(strongs[i]).animate({backgroundColor: "#f03b20", color: "white"}, duration);
        }
    }
}

export default EditorHeatmapView;