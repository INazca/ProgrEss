/* eslint-disable no-underscore-dangle */
/* eslint-env browser */

class Controller {

    constructor(data, view) {
        this.data = data;
        this.view = view;
        this._viewable = false;
        this.initialized = false;
    } 

    show() {
        this.view.showCard();
        if(!this.initialized) {
            this.view.initEditor();
            this.initialized = true;
        }
    }

    end() {
        this.view.hideCardLeft();
    }

    hideRight() {
        this.view.hideCardRight();
        this._viewable = true;
    }

    hideLeft() {
        this.view.hideCardLeft();
    }

    get node() {
        return this.view.node;
    }

    get controlType() {
        return this.data.controlType;
    }

    get edited() {
        return this._edited;
    }

    get viewable() {
        return this._viewable;
    }
}

export default Controller;