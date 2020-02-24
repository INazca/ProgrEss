/* eslint-env browser */
import HomeView from "../js/views/HomeView.js";

var surveyButton,
    codeInput,
    validIDs,
    view;

function init() {
    surveyButton = document.getElementById("survey-button");
    codeInput = document.getElementById("code-input");
    validIDs = JSON.parse(document.getElementById("idContainer").innerHTML);
    view = new HomeView(surveyButton, codeInput);

    surveyButton.addEventListener("click", onSurveyJoin);
    codeInput.addEventListener("change", onCodeChange);
}

function onSurveyJoin() {
    var input = view.codeInput;

    //disable home view while checking validity
    view.disabled(true);

    if(validationCheck(input)) {
        view.surveyLink = input;
        view.clickSurveyLink();
    } else {
        //enable home view when input was not valid
        view.disabled(false);
    }
}

function onCodeChange() {
    var input = view.codeInput;

    view.clearInputStyle();
    if(!validationCheck(input)) {
        view.inputStyle = "input-error";
    } else {
        view.inputStyle = "input-solution";
    }
}

function validationCheck(value) {
    for(let i = 0; i < validIDs.length; i++) {
        if(validIDs[i] === value) {
            return true;
        }
    }
    return false;
}

init();