var codeEditor = CodeMirror(document.getElementsByClassName("editor-container-ss")[0], {
    value: "public class Object {\n    public Object(int variable) {\n    }\n}",
    mode: "text/x-java",
    readOnly: true,
});