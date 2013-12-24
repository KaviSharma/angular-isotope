/*
 * ANS jQuery Bookmarklet launcher (v.3.0)
 *
 * A navalla suíza (http://idc.anavallasuiza.com/project/bookmarklet/)
 *
 * Released under the Creative Commons Attribution 3.0 Unported License,
 * as defined here: http://creativecommons.org/licenses/by/3.0/
 */

"use strict";
var baseUrl = 'http://angular-isotope.herokuapp.com';
//var baseUrl = 'http://localhost:5000';

function getMaxImage() {
    var maxDimension = 0;
    var maxImage = null;

    // Iterate through all the images.
    var imgElements = document.getElementsByTagName('img');
    for (var index in imgElements) {
        var img = imgElements[index];
        var currDimension = img.width * img.height;
        if (currDimension > maxDimension) {
            maxDimension = currDimension
            maxImage = img;
        }
    }
    // Check if an image has been found.
    if (maxImage)
        return maxImage.src;
    else
        return null;
}
function getXmlHttp() {
    var xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return xmlhttp;
}

function sendPin(data) {
    var xmlhttp = getXmlHttp();
    xmlhttp.open("POST", baseUrl + "/api/pins/save", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");

    xmlhttp.send(JSON.stringify(data));
    restore();
}

function showPopover1() {
    var orgImg = getMaxImage();
    if (!orgImg) {
        alert("No Image found");
        return;
    }

    var request = getXmlHttp();
    request.open("GET", baseUrl + "/views/popup.html");
    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            //alert("request completed");
            var container = document.createElement("div");
            container.setAttribute("id", "pinit-div-popover-987989012233")
            document.body.appendChild(container);

            var html = request.response;
            container.innerHTML = html;

            var img = document.getElementById("pinit-product-img");
            var description = document.getElementById("pinit-product-description");
            var retailPrice = document.getElementById("pinit-retail-price");
            var askPrice = document.getElementById("pinit-ask-price");
            var category = document.getElementById("pinit-product-category");

            description.value = getDescription();
            retailPrice.setAttribute("value", getRetailPrice());
            askPrice.setAttribute("value", getAskPrice());

            img.src = orgImg;

            var closeButton = document.getElementById("pinit-bth-close");
            closeButton.onclick = function () {
                restore();
            }

            var addButton = document.getElementById("pinit-btn-ask");

            addButton.onclick = function () {
                var description = document.getElementById("pinit-product-description").value;
                var retailPrice = document.getElementById("pinit-retail-price").value;
                var askPrice = document.getElementById("pinit-ask-price").value;
                var category = document.getElementById("pinit-product-category").value;

                var data = {imageUrl: orgImg, productName: description, retail: retailPrice, ask: askPrice, category: category};

                sendPin(data);
            }
        }
    }

    request.send();
}

function getDescription() {
    return getMetaPropertyValue("og:title");
}

function getRetailPrice() {
    return getMetaValue("schemaorg-offer-price");
}

function getAskPrice() {
    return getMetaValue("schemaorg-offer-price");
}

function getCategory() {

}

function getMetaValue(id) {
    var ele = document.getElementById(id);
    if (ele)
        return ele.getAttribute("content") || '';
    return "";
}

function getMetaPropertyValue(property) {
    var metas = document.getElementsByTagName('meta');

    for (var i = 0; i < metas.length; i++) {
        if (metas[i].getAttribute("property") == property) {
            return metas[i].getAttribute("content");
        }
    }

    return "";
}

function showPopover() {
    // create overlay and append to page

    var orgImg = getMaxImage();
    if (orgImg == null) {
        alert("No Image found");
        return;
    }
    var overlay = document.createElement("div");
    var heading = document.createElement("h2");
    heading.innerHTML = "Pin it!!!"
    overlay.appendChild(heading);
    overlay.appendChild(document.createElement("br"));

    overlay.setAttribute("id", "overlay");
    overlay.setAttribute("class", "bl-overlay");
    document.body.appendChild(overlay);

    // create image and append to page
    var img = document.createElement("img");
    //img.setAttribute("id", "img");
    img.src = orgImg;
    img.setAttribute("class", "bl-overlayimg");
    overlay.appendChild(img);

    // click to restore page
    img.onclick = restore;

    var addButton = document.createElement("button");
    var closeButton = document.createElement("button");
    addButton.innerHTML = "Pin it";
    closeButton.innerHTML = "Close";

    addButton.onclick = function () {
        var description = document.getElementById("pinit-product-description").value;
        var retailPrice = document.getElementById("pinit-retail-price").value;
        var askPrice = document.getElementById("pinit-ask-price").value;

        var data = {img: orgImg, title: document.title};
        sendPin(data);
    }

    closeButton.onclick = function () {
        restore();
    }
    overlay.appendChild(document.createElement("br"));
    overlay.appendChild(addButton);
    overlay.appendChild(closeButton);
    overlay.appendChild(document.createElement("br"));
    overlay.appendChild(document.createElement("br"));
    var caption = document.createElement("label");
    caption.innerHTML = document.title;

    overlay.appendChild(caption);

    //document.body.appendChild(img);
}

// restore page to normal
function restore() {
//    document.body.removeChild(document.getElementById("img"));
//    document.body.removeChild(document.getElementById("overlay"));
    document.body.removeChild(document.getElementById("pinit-div-popover-987989012233"));
//    document.body.removeChild(document.getElementById("overlay"));
}


window.bookmarklet = {
    css: {},
    js: {},
    jQuery: false,

    launch: function (file) {
        if (!file) {
            return false;
        }

        this.loadJS(file, function () {
            var options = window.bookmarklet.options || {};

            window.bookmarklet.execute(options);
        });
    },
    execute: function (options) {
        if (typeof(options.css) !== 'object') {
            if (options.css) {
                options.css = [options.css];
            } else {
                options.css = [];
            }
        }

        if (typeof(options.js) !== 'object') {
            if (options.js) {
                options.js = [options.js];
            } else {
                options.js = [];
            }
        }

        //Load css
        if (options.css.length) {
            var i;

            for (i in options.css) {
                window.bookmarklet.loadCSS(options.css[i]);
            }
        }

        //Load jQuery
        if (options.jquery) {
            options.js.unshift(options.jquery);
        }

        //Load js
        window.bookmarklet.loadMultipleJS(options.js, function () {
            if (options.jquery) {
                if (!window.bookmarklet.jQuery) {
                    window.bookmarklet.jQuery = window.jQuery.noConflict(true);
                }

                window.bookmarklet.jQuery(options.ready);
            } else {
                options.ready();
            }
        });
    },
    loadMultipleJS: function (files, onload) {
        if (files.length === 0) {
            if (onload) {
                onload();
            }

            return true;
        }

        this.loadJS(files.shift(), function () {
            window.bookmarklet.loadMultipleJS(files, onload);
        });
    },
    loadJS: function (file, onload) {
        var element = this.loadedJS(file);

        if (element) {
            if (typeof onload === 'function') {
                onload.call(element);
            }

            return false;
        }

        element = document.createElement('script');
        element.type = 'text/javascript';
        element.src = file;

        if (!document.attachEvent) {
            element.onload = onload;
        } else if (typeof onload === 'function') {
            element.onreadystatechange = function () {
                if (element.readyState === 'complete' || element.readyState === 'loaded') {
                    onload.call(element);
                    element.onreadystatechange = null;
                }
            };
        }

        document.body.appendChild(element);

        this.js[file] = element;

        return element;
    },
    loadCSS: function (file) {
        if (this.loadedCSS(file)) {
            return false;
        }

        var element = document.createElement('link');
        element.setAttribute('rel', 'stylesheet');
        element.setAttribute('type', 'text/css');
        element.setAttribute('href', file);

        document.getElementsByTagName('head')[0].appendChild(element);

        this.css[file] = element;

        return element;
    },
    loadedJS: function (file) {
        if (this.js[file]) {
            return this.js[file];
        }

        return false;
    },
    loadedCSS: function (file) {
        if (this.css[file]) {
            return this.css[file];
        }

        return false;
    },
    die: function () {
        var i;

        for (i in this.js) {
            this.js[i].parentNode.removeChild(this.js[i]);
        }
        for (i in this.css) {
            this.css[i].parentNode.removeChild(this.css[i]);
        }

        this.js = {};
        this.css = {};
        this.jQuery = false;
    },
    executeMyBookmarklet: function () {
        window.bookmarklet.execute({
            css: baseUrl + '/bl/bl.css',
            ready: function ($) {
                showPopover1();
            }
        })
    }
};