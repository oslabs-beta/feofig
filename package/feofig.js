import React, { useEffect, useMemo, useState } from 'react';
import LazyLoad from './utils/lazyload';
import Debounce from './utils/debounce';
import Throttle from './utils/throttle';
import validateConfigs from './types/validateConfig';
import PauseAnimation from './utils/pauseAnimation';
const Fig = ({ children, config, placeholder }) => {
    const [transformedChildren, setTransformedChildren] = useState(null);
    const [finishedTransforming, setFinishedTransforming] = useState(false);
    useEffect(() => {
        // tests to see if user inputs for config are valid, throws error if not
        if (config.validate === undefined || config.validate === true)
            validateConfigs(config);
    }, [config]);
    const isLazyLoadEnabled = config && config.lazyload;
    const isDebounceEnabled = config && config.debounce;
    const isThrottleEnabled = config && config.throttle;
    const isPauseAnimationEnabled = config && config.pauseAnimation;
    // Memoize the elementIsolator function to prevent unnecessary recalculations
    const memoizedElementIsolator = useMemo(() => {
        // Recursively iterates through elements to find desired type to wrap
        // May affect performance when recursing on every rerender for deeply nested code.
        const elementIsolator = (node) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
            // check if the node is a Fig component, if so then ignore Fig
            if (React.isValidElement(node) && node.type === Fig) {
                return node;
            }
            // preserves non-element nodes like strings
            if (!React.isValidElement(node))
                return node;
            if (isPauseAnimationEnabled) {
                // in the Config, developer will designate which css classes to disable by adding css class names to the "classes" property on 'pauseAnimation'
                // conditional is checking if any of the designated classes are applied to the node
                if ((_a = config.pauseAnimation) === null || _a === void 0 ? void 0 : _a.classes.includes(node.props.className)) {
                    return (React.createElement(React.Fragment, null,
                        React.createElement(PauseAnimation, { threshold: (_b = config.pauseAnimation) === null || _b === void 0 ? void 0 : _b.threshold, offset: (_c = config.pauseAnimation) === null || _c === void 0 ? void 0 : _c.offset }, node)));
                }
            }
            // if node is an image, wrap it with LazyLoad
            if (isLazyLoadEnabled) {
                if (node.type === 'img') {
                    return (React.createElement(LazyLoad, { key: (Math.random() * Math.random() * 99999).toString(), threshold: ((_d = config.lazyload) === null || _d === void 0 ? void 0 : _d.threshold) || 0, placeholder: placeholder, once: ((_e = config.lazyload) === null || _e === void 0 ? void 0 : _e.once) !== false, offset: ((_f = config.lazyload) === null || _f === void 0 ? void 0 : _f.offset) || '0px' }, node));
                }
            }
            // still need to filter by config.target
            if (isDebounceEnabled) {
                if (Array.isArray((_g = config.debounce) === null || _g === void 0 ? void 0 : _g.target)) {
                }
                else if (node.type === 'input' ||
                    node.type === 'textarea' ||
                    node.type === 'select') {
                    return (React.createElement(React.Fragment, null,
                        React.createElement(Debounce, { onChange: node.props.onChange, minLength: ((_h = config.debounce) === null || _h === void 0 ? void 0 : _h.minLength) || 0, 
                            // there is an unsolved bug when timeout is set to 100, so adding 1 ms if user sets it to 100. If set to 100, will throw an error related to the 'notify' ref in debounce.tsx
                            debounceTimeout: ((_j = config.debounce) === null || _j === void 0 ? void 0 : _j.delay) === undefined ||
                                ((_k = config.debounce) === null || _k === void 0 ? void 0 : _k.delay) === 100
                                ? 101
                                : (_l = config.debounce) === null || _l === void 0 ? void 0 : _l.delay }, node)));
                }
                else if (node.type === 'form') {
                    return (React.createElement("form", Object.assign({}, node.props), React.Children.map(node.props.children, (child) => memoizedElementIsolator(child) || child)));
                }
            }
            if (isThrottleEnabled) {
                if (Array.isArray((_m = config.throttle) === null || _m === void 0 ? void 0 : _m.target)) {
                }
                else if (node.type === 'input') {
                    return (React.createElement(React.Fragment, null,
                        React.createElement(Throttle, { onChange: node.props.onChange, minLength: ((_o = config.throttle) === null || _o === void 0 ? void 0 : _o.minLength) || 0, throttleTimeout: ((_p = config.throttle) === null || _p === void 0 ? void 0 : _p.delay) === undefined
                                ? 100
                                : (_q = config.throttle) === null || _q === void 0 ? void 0 : _q.delay }, node)));
                }
            }
            // if node has children, recursively transform them to fit react props children array format
            if (node.props && node.props.children) {
                const children = React.Children.toArray(node.props.children).map(elementIsolator);
                return React.cloneElement(node, Object.assign(Object.assign({}, node.props), { children: children }));
            }
            return node;
        };
        return elementIsolator;
    }, [config]); // Add dependencies that affect the transformation
    // calls recursive function to apply FEO wrappers to each child
    const wrapper = (child, index) => {
        if (!React.isValidElement(child)) {
            return child;
        }
        // calls recursive function, add more checks here if necessary
        if (isLazyLoadEnabled ||
            isDebounceEnabled ||
            isThrottleEnabled ||
            isPauseAnimationEnabled) {
            return memoizedElementIsolator(child) || child;
        }
    };
    // Memoize the transformed children
    const memoizedChildren = useMemo(() => {
        return React.Children.map(children, wrapper);
    }, [children, memoizedElementIsolator]);
    return React.createElement(React.Fragment, null, memoizedChildren);
};
export default Fig;
