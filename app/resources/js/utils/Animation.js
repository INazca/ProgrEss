/* eslint-disable no-underscore-dangle */
/* eslint-env browser */

class Animation {

    click(element) {
        var width = element.offsetWidth,
            height = element.offsetHeight;

        $(element).animate({width: width * 1.2, height: height * 1.2}, {duration: 70, complete: onClicked.bind(this, element, width, height)});
    }

    showBottom(element) {
        $(element).animate({bottom: 0}, {duration: 1000, complete: this.click.bind(this, element)});
    }

    hideBottom() {

    }
}

function onClicked(element, width, height) {
    $(element).animate({width: width, height: height}, 70);
}

export default new Animation();