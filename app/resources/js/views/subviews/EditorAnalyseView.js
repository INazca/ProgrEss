/* eslint-env browser */
import EditorView from "../subviews/EditorView.js";

class EditorAnalyseView extends EditorView {

    constructor(task, code, type) {
        super(task, code, true, type);
        this.duration = 2000;
    }

    showHeatmap() {
        var lights = this.card.getElementsByClassName("heat-light"),
            mediums = this.card.getElementsByClassName("heat-medium"),
            strongs = this.card.getElementsByClassName("heat-strong");

        for(let i = 0; i < lights.length; i++) {
            $(lights[i]).animate({backgroundColor: "#ffeda0", color: "black", fontSize: "1.2rem"}, this.duration);
        }

        for(let i = 0; i < mediums.length; i++) {
            $(mediums[i]).animate({backgroundColor: "#feb24c", color: "black", fontSize: "1.4rem"}, this.duration);
        }

        for(let i = 0; i < strongs.length; i++) {
            $(strongs[i]).animate({backgroundColor: "#f03b20", color: "white", fontSize: "1.6rem"}, this.duration);
        }
    }

    addLegend() {
        var legend = document.createElement("small");

        legend.innerHTML = `
            <div class="legend"><div class="legend-color light"></div> wurde mindestens 1x markiert</div>
            <div class="legend"><div class="legend-color medium"></div> wurde von mindestens 50% der Teilnehmer markiert</div>
            <div class="legend"><div class="legend-color strong"></div> wurde von mindestens 80% der Teilnehmer markiert</div>
        `;

        legend.classList.add("legend-wrapper");

        this.card.getElementsByClassName("survey-content")[0].append(legend);
    }

    showSolution() {
        var solutionMarks = this.card.getElementsByClassName("solution-mark");

        for(let i = 0; i < solutionMarks.length; i++) {
            $(solutionMarks[i]).animate({backgroundColor: "#2e7d32", color: "white", fontSize: "1.6rem"}, this.duration);
        }
    }

}

export default EditorAnalyseView;