"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var LazyLoad = function (_a) {
    var children = _a.children, threshold = _a.threshold, placeholder = _a.placeholder;
    var elementRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        var options = {
            root: null,
            rootMargin: '0px',
            threshold: threshold || 0.5,
        };
        var handleIntersection = function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var element = entry.target;
                    if (element.nodeName === 'IMG') {
                        var imgElement = element;
                        imgElement.className = children.props.className; // replace placeholder className to img className
                        imgElement.src = children.props.src; // replace placeholder src to img src
                        observer.unobserve(element);
                    }
                    else {
                        element.innerHTML = children.props.children;
                        observer.unobserve(element);
                    }
                }
            });
        };
        var observer = new IntersectionObserver(handleIntersection, options);
        if (elementRef.current) {
            observer.observe(elementRef.current);
        }
        return function () {
            if (elementRef.current) {
                observer.unobserve(elementRef.current);
            }
        };
    }, []);
    var returnRenderedElement = function (children) {
        if (children.type === 'img') {
            if (placeholder)
                return react_1.default.cloneElement(placeholder, { ref: elementRef });
            else
                return react_1.default.cloneElement(children, { ref: elementRef, src: null });
        }
        else
            return react_1.default.cloneElement(children, { ref: elementRef, children: null });
    };
    var newReactElement = returnRenderedElement(children);
    return newReactElement;
};
exports.default = LazyLoad;
