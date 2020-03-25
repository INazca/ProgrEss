/* eslint-disable no-underscore-dangle */
/* eslint-env browser */
import EditorView from "../subviews/EditorView.js";
import { Event } from "../../utils/Observable.js";

class EditorMarkView extends EditorView{

    constructor(task, code, type) {
        super(task, code, true, type);

        this.checkBoxes = [];
        adjustColor(this._highlightButton, this._eraseButton, type);
    }

    initEditor() {
        this.editor = registerEditor(this.editorContainer, this.code, this.readOnly);
        
        for(let i = 0; i < this.editor.lineCount(); i++) {
            let checkBoxWrapper = document.createElement("div");

            checkBoxWrapper.classList.add("form-group", "form-check");
            checkBoxWrapper.innerHTML = `<input type="checkbox" class="form-check-input">`;

            checkBoxWrapper.addEventListener("click", onMark.bind(this, checkBoxWrapper, i));

            this.checkBoxes.push(checkBoxWrapper);
            this.editor.setGutterMarker(i, "marking-gutter", checkBoxWrapper);
        }
        
    }

    set highlights(lines) {
        lines.forEach(line => {
            this.editor.addLineClass(line, "background", "highlighted");
            this.checkBoxes[line].getElementsByClassName("form-check-input")[0].checked = true;
        });
    }

    set editable(isEditable) {
        this.checkBoxes.forEach(checkBoxWrapper => {
            let checkBox = checkBoxWrapper.getElementsByClassName("form-check-input")[0];

            checkBox.disabled = !isEditable;
        });
    }

    get selections() {
        return this.editor.listSelections();
    }

    get highlights() {
        return this.editor.getAllMarks();
    }
}

function adjustColor(type) {
    //adjust colors if to do
}

function registerEditor(element, code, readOnly) {
    var editor = CodeMirror(element, {
        value: code,
        mode: "text/x-java",
        readOnly: readOnly,
        lineNumbers: true,
        // configureMouse: function(){
        //     return{unit: "word"};
        // },
        gutters: ["marking-gutter"],
    });
    return editor;
}

function onMark(checkBoxWrapper, line) {
    var checkBox = checkBoxWrapper.getElementsByClassName("form-check-input")[0];

    if(checkBox.checked) {
        this.editor.addLineClass(line, "background", "highlighted");
    } else {
        this.editor.removeLineClass(line, "background", "highlighted");
    }

    this.notifyAll(new Event("highlightsChanged"));
}

export default EditorMarkView;