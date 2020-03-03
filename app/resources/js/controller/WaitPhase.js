/* eslint-disable no-underscore-dangle */
/* eslint-env browser */
import Controller from "./Controller.js";
import CardView from "../views/CardView.js";
import { Event } from "../utils/Observable.js";

class WaitPhase extends Controller {

    constructor(message, waitTime) {
        super({controlType: "wait", waitTime: waitTime}, new CardView(message, "wait", "wait-phase"));
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