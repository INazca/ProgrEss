/* eslint-env browser */

class HomeView {

    constructor() {
        this.codeInput = document.getElementById("code-input");
        this.surveyButton = document.getElementById("survey-button");
        this.surveyLink = document.getElementById("survey-link");

        this.surveyButton.addEventListener("click", onSurveyJoin.bind(this, {input: this.codeInput, link: this.surveyLink}));
    }
}

function onSurveyJoin(surveyElements) {
    var link = surveyElements.link,
        input = surveyElements.input;

    link.href = "/" + input.value;
    link.click();
}

export default HomeView;