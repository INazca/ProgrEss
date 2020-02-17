/* eslint-env browser */
import HomeView from "../js/views/HomeView.js";

var surveyButton,
    view;

function init() {
    surveyButton = document.getElementById("survey-button");
    view = new HomeView(surveyButton);

    surveyButton.addEventListener("click", onSurveyJoin);
}

function onSurveyJoin() {
    var input = view.codeInput;

    //disable home view while checking validity
    view.disabled(true);

    if(validationCheck(input) === true) {
        view.surveyLink = input;
        view.clickSurveyLink();
    } else {
        view.disabled(false);
    }
}

function validationCheck(value) {
    //add code for input validation
    return true;
}

init();