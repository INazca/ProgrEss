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

        for (let i = 0; i < lights.length; i++) {
            let element = lights[i];

            if (element.getElementsByClassName("CodeMirror-linenumber")[0]) {
                element = element.getElementsByClassName("CodeMirror-linenumber")[0];
                $(element).animate({ backgroundColor: "#ffeda0", color: "black" }, this.duration);
            } else {
                $(element).animate({ backgroundColor: "#ffeda0", color: "black", fontSize: "1.2rem" }, this.duration);
            }
        }

        for (let i = 0; i < mediums.length; i++) {
            let element = mediums[i];

            if (element.getElementsByClassName("CodeMirror-linenumber")[0]) {
                element = element.getElementsByClassName("CodeMirror-linenumber")[0];
                $(element).animate({ backgroundColor: "#feb24c", color: "black" }, this.duration);
            } else {
                $(element).animate({ backgroundColor: "#feb24c", color: "black", fontSize: "1.4rem" }, this.duration);
            }
        }

        for (let i = 0; i < strongs.length; i++) {
            let element = strongs[i];

            if (element.getElementsByClassName("CodeMirror-linenumber")[0]) {
                element = element.getElementsByClassName("CodeMirror-linenumber")[0];
                $(element).animate({ backgroundColor: "#f03b20", color: "white" }, this.duration);
            } else {
                $(element).animate({ backgroundColor: "#f03b20", color: "white", fontSize: "1.6rem" }, this.duration);
            }
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

        for (let i = 0; i < solutionMarks.length; i++) {
            let element = solutionMarks[i];

            if (element.classList.contains("CodeMirror-gutter-background")) {
                $(element).animate({ backgroundColor: "#2e7d32" }, this.duration);
            }

            if (element.getElementsByClassName("CodeMirror-linenumber")[0]) {
                element = element.getElementsByClassName("CodeMirror-linenumber")[0];
                $(element).animate({ color: "white" }, this.duration);
            } else {
                $(element).animate({ backgroundColor: "#2e7d32", color: "white", fontSize: "1.6rem" }, this.duration);
            }
        }
    }

}

export default EditorAnalyseView;