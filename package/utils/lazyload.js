"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const LazyLoad = ({ children, threshold, placeholder, }) => {
    const elementRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: threshold || 0.5,
        };
        const handleIntersection = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    if (element.nodeName === 'IMG') {
                        const imgElement = element;
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
        const observer = new IntersectionObserver(handleIntersection, options);
        if (elementRef.current) {
            observer.observe(elementRef.current);
        }
        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current);
            }
        };
    }, []);
    const returnRenderedElement = (children) => {
        if (children.type === 'img') {
            if (placeholder)
                return react_1.default.cloneElement(placeholder, { ref: elementRef });
            else
                return react_1.default.cloneElement(children, { ref: elementRef, src: null });
        }
        else
            return react_1.default.cloneElement(children, { ref: elementRef, children: null });
    };
    const newReactElement = returnRenderedElement(children);
    return newReactElement;
};
exports.default = LazyLoad;
