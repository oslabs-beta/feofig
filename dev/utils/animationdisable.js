"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var animationDisable_module_css_1 = require("./animationDisable.module.css");
var AnimationDisable = function (_a) {
    var children = _a.children, _b = _a.threshold, threshold = _b === void 0 ? 0.5 : _b, _c = _a.offset, offset = _c === void 0 ? '0px' : _c;
    var elementRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        var options = {
            root: null,
            rootMargin: offset,
            threshold: threshold,
        };
        var handleIntersection = function (entries, observer) {
            entries.forEach(function (entry) {
                var element = entry.target;
                if (entry.isIntersecting) {
                    // element.style.animationDuration = children?.style.animationDuration
                    element.classList.remove(animationDisable_module_css_1.default.disable);
                }
                else {
                    //element.style.animationDuration = '0s !important';
                    element.classList.add(animationDisable_module_css_1.default.disable);
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
    var child = children;
    var clonedElement = react_1.default.cloneElement(child, { ref: elementRef });
    // clonedElement.style.animationDuration = '0s !important';
    return clonedElement;
};
exports.default = AnimationDisable;
