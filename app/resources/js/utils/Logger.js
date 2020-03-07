/* eslint-env browser */

class Logger {

    constructor() {
        this.count = 0;
    }

    addLog(event) {
        localStorage.setItem("log" + this.count, event + " at: " + new Date().toLocaleTimeString());
        this.count++;
    }

    retrieveStorage(element) {
        for (let i = 0; i < localStorage.length; i++) {
            let el = document.createElement("div");

            el.innerHTML = localStorage.getItem("log" + i);
            element.appendChild(el);
        }
    }
}

export default new Logger();