/* eslint-disable no-underscore-dangle */
/* eslint-env browser */
import Controller from "../Controller.js";
import EditorsView from "../../views/subviews/EditorsView.js";

class MicrotaskDiscussion extends Controller {

    constructor(data) {
        super(data, new EditorsView(`<div class="discussion-font-color">Statistiken zu den Abgaben</div>` + data.task, data.discussionSolutions, data.controlType));
    }

    show() {
        this.view.showCard();
        if (!this.initialized) {
            this.view.initEditor();
            this.view.initCorrectness();
            this.initialized = true;
        }
    }
}

export default MicrotaskDiscussion;