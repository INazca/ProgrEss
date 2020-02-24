/* eslint-disable no-underscore-dangle */
/* eslint-env browser */

class HomeView {

    constructor(surveyButton, codeInput) {    
        this._surveyLink = document.getElementById("survey-link");

        //controller elements
        this._codeInput = codeInput;
        this._surveyButton = surveyButton;
    }

    disabled(isDisabled) {
        this._codeInput.disabled = isDisabled;
        this._surveyButton.disabled = isDisabled;
    }

    clickSurveyLink() {
        this._surveyLink.click();
    }

    clearInputStyle() {
        this._codeInput.className = "";
        this._codeInput.classList.add("form-control");
        this._codeInput.classList.add("form-control-lg");
    }

    set surveyLink(code) {
        this._surveyLink.href = "/" + code;
    }

    set inputStyle(className) {
        this._codeInput.classList.add(className);
    }

    get codeInput() {
        return this._codeInput.value;
    }
}

export default HomeView;