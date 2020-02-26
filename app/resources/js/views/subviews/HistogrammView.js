import CardView from "../CardView.js";
/* eslint-disable no-underscore-dangle */
/* eslint-env browser */

var colorCorrect = "#33a02c",
    colorRest = "#a6cee3";

class HistogrammView extends CardView {

    constructor(task, expression, histogramm) {
        super(task, "type-determination-discussion");

        this.card.getElementsByClassName("expression")[0].innerHTML = expression;
        this.data = histogramm;

        this.highestY = calcHighestY(this.data);
    }

    drawHistogramm() {
        //create the barplot
        var histogramm = d3.select(".histogramm-container"),
            margin = { top: 20, right: 20, bottom: 30, left: 30 },
            width = document.getElementsByClassName("histogramm-container")[0].offsetWidth - (margin.left + margin.right),
            height = document.getElementsByClassName("histogramm-container")[0].offsetHeight - (margin.top + margin.bottom),
            subgroups = ["correct", "rest"],
            groups = d3.map(this.data, function (d) { return d.group; }).keys(),
            svg = histogramm.append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .attr("padding", margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")"),
            x = d3.scaleBand()
                .domain(groups)
                .range([0, width])
                .padding([0.2]),
            y = d3.scaleLinear()
                .domain([0, this.highestY])
                .range([height, 0]),
            color = d3.scaleOrdinal()
                .domain(subgroups)
                .range([colorCorrect, colorRest]),
            stackedData = d3.stack()
                .keys(subgroups)
                (this.data);

        svg.append("g")
            .attr("transform", "translate(0, " + height + ")")
            .call(d3.axisBottom(x).tickSizeOuter(0));

        svg.append("g")
            .call(d3.axisLeft(y));

        svg.append("g")
            .selectAll("g")
            .data(stackedData)
            .enter().append("g")
            .attr("fill", function (d) { return color(d.key); })
            .selectAll("rect")
            .data(function (d) { return d; })
            .enter().append("rect")
            .attr("x", function (d) { return x(d.data.group); })
            .attr("y", function () { return y(0);})
            .attr("width", x.bandwidth())
            .transition()
            .duration(2000)
            .attr("y", function (d) { return y(d[1]); })
            .attr("height", function (d) { return y(d[0]) - y(d[1]); });
    }

    addLegend() {
        var legend = document.createElement("small");

        legend.innerHTML = `
            <div class="legend"><div class="legend-color" style="background-color: ${colorCorrect}"></div> als korrekt gewerteter Anteil</div>
            <div class="legend"><div class="legend-color" style="background-color: ${colorRest}"></div> restlicher Anteil</div>
        `;

        legend.classList.add("legend-wrapper");

        this.card.getElementsByClassName("survey-content")[0].append(legend);
    }

}

function calcHighestY(histogramm) {
    var values = [],
        max;

    histogramm.forEach(set => {
        values.push(set.correct + set.rest);
    });

    max = values.reduce(function(a, b) {
        return Math.max(a, b);
    });

    return Math.floor(max * 1.2);
}

export default HistogrammView;