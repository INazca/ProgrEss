/* eslint-disable no-underscore-dangle */
/* eslint-env browser */
import CardView from "./CardView.js";

class WaitView extends CardView{

    constructor(message, icon) {
        super(message, "wait", "wait-template");

        this.iconEl = this.card.getElementsByClassName("wait-icon")[0];

        if(icon) {
            this.iconEl.innerHTML = icon;
        }
    }
}

export default WaitView;