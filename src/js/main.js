function runBanner() {
    animateElement(frameElements[0], 'img1Move');
    animateElement(frameElements[1], 'text1Move');
    animateElement(frameElements[2]);
    animateElement(frameElements[3], 'text2Move');
    animateElement(frameElements[4], 'img2Move');
    animateElement(frameElements[5], 'icon1Move');
    animateElement(frameElements[6], 'text2Move');
    animateElement(frameElements[7], 'img2Move');
    animateElement(frameElements[8], 'icon1Move');

    animateElement(frameElements[9]);
    animateElement(frameElements[10]);

    animateElement(frameElements[11], 'phone1Move');
    animateElement(frameElements[12], 'phone2Move');
}

function hasClass(el, cls) {
    return el.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

function addClass(el, cls) {
    if (!hasClass(el, cls)) el.className += " " + cls;
}

function removeClass(el, cls) {
    if (hasClass(el, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        el.className = el.className.replace(reg, ' ');
    }
}

function cleanClass(el, cls) {
    if (hasClass(el, cls)) {
        removeClass(el, cls);
    }
}

var bannerDuration = 14800;

var frameElements = document.querySelectorAll('.frame-element');

function getAnimationTime(elementObj) {
    var animationTime = {
        startTime: 0,
        stopTime: 0
    };

    if (elementObj.dataset !== undefined) {
        animationTime.startTime = parseInt(elementObj.dataset.starttime) / 100 * bannerDuration;
        animationTime.stopTime = parseInt(elementObj.dataset.stoptime) / 100 * bannerDuration;
    } else {
        animationTime.startTime = elementObj.getAttribute('data-startTime') / 100 * bannerDuration;
        animationTime.stopTime = elementObj.getAttribute('data-stopTime') / 100 * bannerDuration;
    }

    return animationTime;
}

function animateElement(elementObj, animClass, callback) {
    var animTime = getAnimationTime(elementObj);

    cleanClass(elementObj, animClass);

    setTimeout(function() {
        if (callback) {
            callback();
        }
        elementObj.style.opacity = 1;
        if (animClass) {
            addClass(elementObj, animClass);
        }
        setTimeout(function() {
            elementObj.style.opacity = 0;

            cleanClass(elementObj, animClass);
        }, animTime.stopTime - animTime.startTime);
    }, animTime.startTime);
}

runBanner();

var bannerRotator = setInterval(function() {
    runBanner();
}, bannerDuration);
