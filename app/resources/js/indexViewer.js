//instantiate codeEditors
var codeEditorSS = CodeMirror(document.getElementsByClassName("editor-container-ss")[0], {
    value: "public class Object {\n    public Object(int variable) {\n    }\n}",
    mode: "text/x-java",
    readOnly: true,
}),
codeEditorSE = CodeMirror(document.getElementsByClassName("editor-container-se")[0], {
    value: "public class Object {\n    public Object(int variable) {\n    }\n}",
    mode: "text/x-java",
    readOnly: true,
}),
codeEditorSD = CodeMirror(document.getElementsByClassName("editor-container-sd")[0], {
    value: "public class Object {\n    public Object(int variable) {\n    }\n}",
    mode: "text/x-java",
    readOnly: true,
}),
codeEditorSR = CodeMirror(document.getElementsByClassName("editor-container-sr")[0], {
    value: "public class Object {\n    public Object(int variable) {\n    }\n}",
    mode: "text/x-java",
    readOnly: true,
}),
codeEditorTS = CodeMirror(document.getElementsByClassName("editor-container-ts")[0], {
    value: "public class Object {\n    public Object(int variable) {\n    }\n}",
    mode: "text/x-java",
    readOnly: true,
}),
codeEditorTE = CodeMirror(document.getElementsByClassName("editor-container-te")[0], {
    value: "public class Object {\n    public Object(int variable) {\n    }\n}",
    mode: "text/x-java",
    readOnly: true,
}),
codeEditorTR = CodeMirror(document.getElementsByClassName("editor-container-tr")[0], {
    value: "public class Object {\n    public Object(int variable) {\n    }\n}",
    mode: "text/x-java",
    readOnly: true,
}),
codeEditorMS = CodeMirror(document.getElementsByClassName("editor-container-ms")[0], {
    value: "public class Object {\n    public Object(int variable) {\n    }\n}",
    mode: "text/x-java",
}),
codeEditorME = CodeMirror(document.getElementsByClassName("editor-container-me")[0], {
    value: "public class Object {\n    public Object(int variable) {\n    }\n}",
    mode: "text/x-java",
    readOnly: true,
}),
codeEditorMD1 = CodeMirror(document.getElementsByClassName("editor-container-md1")[0], {
    value: "public class Object {\n    public Object(int variable) {\n    }\n}",
    mode: "text/x-java",
    readOnly: true,
}),
codeEditorMD2 = CodeMirror(document.getElementsByClassName("editor-container-md2")[0], {
    value: "public class Object {\n    public Object(int variable) {\n    }\n}",
    mode: "text/x-java",
    readOnly: true,
});

//create the barplot
var data = [
    {
        group: "answer1",
        correct: 15,
        rest: 5,
    },
    {
        group: "answer2",
        correct: 3,
        rest: 5,
    },
    {
        group: "answer3",
        correct: 5,
        rest: 6,
    }
],
histogramm = d3.select(".histogramm-container"),
margin = { top: 20, right: 20, bottom: 20, left: 20},
width = document.getElementsByClassName("histogramm-container")[0].offsetWidth - (margin.left + margin.right),
height = document.getElementsByClassName("histogramm-container")[0].offsetHeight - (margin.top + margin.bottom),
subgroups = ["correct", "rest"],
groups = d3.map(data, function(d) {return d.group;}).keys();

var svg = histogramm.append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("padding", margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleBand()
    .domain(groups)
    .range([0, width])
    .padding([0.2]);

svg.append("g")
    .attr("transform", "translate(0, " + height + ")")
    .call(d3.axisBottom(x).tickSizeOuter(0));

var y = d3.scaleLinear()
    .domain([0, 50])
    .range([ height, 0 ]);

svg.append("g")
    .call(d3.axisLeft(y));

var color = d3.scaleOrdinal()
    .domain(subgroups)
    .range(['#e41a1c','#377eb8']);

var stackedData = d3.stack()
    .keys(subgroups)
    (data);

svg.append("g")
    .selectAll("g")
    .data(stackedData)
    .enter().append("g")
        .attr("fill", function(d) { return color(d.key);})
        .selectAll("rect")
        .data(function(d) { return d;})
        .enter().append("rect")
            .attr("x", function(d) { return x(d.data.group);})
            .attr("y", function(d) { return y(d[1]);})
            .attr("height", function(d) { return y(d[0]) - y(d[1]);})
            .attr("width", x.bandwidth());