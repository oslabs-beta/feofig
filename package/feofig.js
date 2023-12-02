"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const lazyload_1 = __importDefault(require("./utils/lazyload"));
const Fig = ({ children, config, placeholder }) => {
    const isLazyLoadEnabled = config && config.lazyload;
    const wrapWithLazyLoad = (child, index) => {
        var _a;
        if (isLazyLoadEnabled && react_1.default.isValidElement(child)) {
            return (react_1.default.createElement(lazyload_1.default, { key: index, threshold: ((_a = config.lazyload) === null || _a === void 0 ? void 0 : _a.threshold) || 0, placeholder: placeholder }, child));
        }
        return child;
    };
    return (react_1.default.Children.map(children, (child, index) => wrapWithLazyLoad(child, index)));
};
exports.default = Fig;
