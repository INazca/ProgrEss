import { Event, Observable } from "../utils/Observable.js";

/* eslint-disable no-underscore-dangle */
/* eslint-env browser */

class Controller extends Observable{

    constructor(data, view) {
        super();
        this.data = data;
        this.view = view;
        this._viewable = false;
        this.initialized = false;
    } 

    show() {
        this.view.showCard();
        if(!this.initialized) {
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

    get type() {
        return this.data.type;
    }
}

export default Controller;