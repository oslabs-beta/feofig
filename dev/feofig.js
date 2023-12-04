"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var lazyload_1 = require("./utils/lazyload");
var Fig = function (_a) {
    var children = _a.children, config = _a.config, placeholder = _a.placeholder;
    var isLazyLoadEnabled = config && config.lazyload;
    var wrapWithLazyLoad = function (child, index) {
        var _a;
        if (isLazyLoadEnabled && react_1.default.isValidElement(child)) {
            return (<lazyload_1.default key={index} threshold={((_a = config.lazyload) === null || _a === void 0 ? void 0 : _a.threshold) || 0} placeholder={placeholder}>
          {child}
        </lazyload_1.default>);
        }
        return child;
    };
    return (react_1.default.Children.map(children, function (child, index) {
        return wrapWithLazyLoad(child, index);
    }));
};
exports.default = Fig;
