/* eslint-disable no-underscore-dangle */
/* eslint-env browser */

class HomeView {

    constructor(surveyButton) {
        this._codeInput = document.getElementById("code-input");
        this._surveyLink = document.getElementById("survey-link");

        //controller elements
        this._surveyButton = surveyButton;
    }

    disabled(isDisabled) {
        this._codeInput.disabled = isDisabled;
        this._surveyButton.disabled = isDisabled;
    }

    clickSurveyLink() {
        this._surveyLink.click();
    }

    set surveyLink(code) {
        this._surveyLink.href = "/" + code;
    }

    get codeInput() {
        return this._codeInput.value;
    }
}

export default HomeView;