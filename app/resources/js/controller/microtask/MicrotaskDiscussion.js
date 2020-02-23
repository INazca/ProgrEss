/* eslint-disable no-underscore-dangle */
/* eslint-env browser */
import Controller from "../Controller.js";
import EditorsView from "../../views/subviews/EditorsView.js";

class MicrotaskDiscussion extends Controller {

    constructor(data) {
        super(data, new EditorsView(data.task, data.discussionSolutions));
    }

    show() {
        this.view.showCard();
        if (!this.initialized) {
            this.view.initEditor();
            this.initialized = true;
        }
    }
}

export default MicrotaskDiscussion;