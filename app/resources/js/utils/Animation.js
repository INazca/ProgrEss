/* eslint-disable no-underscore-dangle */
/* eslint-env browser */

class Animation {

    click(element) {
        var width = element.offsetWidth,
            height = element.offsetHeight;

        $(element).animate({width: width * 1.2, height: height * 1.2}, {duration: 70, complete: onClicked.bind(this, element, width, height)});
    }

    showLeft(element) {
        $(element).animate({left: 0}, {duration: 1000, complete: this.click.bind(this, element)});
    }

    showRight(element) {
        $(element).animate({right: 0}, {duration: 1000, complete: this.click.bind(this, element)});
    }

    showBottom(element) {
        $(element).animate({bottom: 0}, {duration: 1000, complete: this.click.bind(this, element)});
    }

    hideLeft(element) {
        $(element).animate({left: "-5rem"}, 1000);
    }

    hideRight(element) {
        $(element).animate({right: "-5rem"}, 1000);
    }

    hideBottom(element) {
        $(element).animate({bottom: "-5rem"}, 1000);
    }

    showFaint(element) {
        $(element).show("faint", 1000);
    }
}

function onClicked(element, width, height) {
    $(element).animate({width: width, height: height}, 70);
}

export default new Animation();