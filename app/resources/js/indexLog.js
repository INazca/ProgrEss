import Logger from "./utils/Logger.js";

/* eslint-env browser */

function init() {
    Logger.retrieveStorage(document.body);
}

init();