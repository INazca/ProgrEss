/* eslint-disable no-underscore-dangle */
/* eslint-env browser */
import Controller from "./Controller.js";
import WaitView from "../views/WaitView.js";
import { Event } from "../utils/Observable.js";

class WaitPhase extends Controller {

    constructor(message, options) {
        super({controlType: options.controlType || "wait", waitTime: options.waitTime}, new WaitView(message, options.icon));
    }

    show() {
        this.view.fadeInCard();

        //set timer for wait view
        if(this.data.waitTime) {
            setTimeout(notify.bind(this), this.data.waitTime);
        }

        if(!this.initialized) {
            this.initialized = true;
        }
    }

    end() {
        this.view.fadeOutCard();
    }
}

function notify() {
    this.notifyAll(new Event("waitEnd"));
}

export default WaitPhase;