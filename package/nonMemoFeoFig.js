import React, { useEffect } from 'react';
import LazyLoad from './utils/lazyload';
import Debounce from './utils/debounce';
import Throttle from './utils/throttle';
import validateConfigs from './types/validateConfig';
const Fig = ({ children, config, placeholder }) => {
    useEffect(() => {
        // tests to see if user inputs for config are valid, throws error if not
        validateConfigs(config);
    }, [config]);
    // might get rid of these since it doesn't type guard well
    const isLazyLoadEnabled = config && config.lazyload;
    const isDebounceEnabled = config && config.debounce;
    const isThrottleEnabled = config && config.throttle;
    // recursively iterates through elements to find desired type to wrap
    // worried about how this will affect performance especially with deeply nested component trees. maybe memoization or a hook to trigger selectively
    const elementIsolator = (node) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        // check if the node is a Fig component, if so then ignore Fig
        if (React.isValidElement(node) && node.type === Fig) {
            return node;
        }
        // might need to add a check here for other custom non-native wrappers
        // preserves non-element nodes like strings
        if (!React.isValidElement(node))
            return node;
        // if node is an image, wrap it with LazyLoad
        if (isLazyLoadEnabled) {
            if (node.type === 'img') {
                return (React.createElement(LazyLoad, { key: crypto.randomUUID(), threshold: ((_a = config.lazyload) === null || _a === void 0 ? void 0 : _a.threshold) || 0, placeholder: placeholder, once: ((_b = config.lazyload) === null || _b === void 0 ? void 0 : _b.once) !== false, offset: ((_c = config.lazyload) === null || _c === void 0 ? void 0 : _c.offset) || '0px' }, node));
            }
        }
        // still need to filter by config.target
        if (isDebounceEnabled) {
            if (Array.isArray((_d = config.debounce) === null || _d === void 0 ? void 0 : _d.target)) {
            }
            else if (node.type === 'input') {
                return (React.createElement(React.Fragment, null,
                    React.createElement(Debounce, { onChange: node.props.onChange, minLength: ((_e = config.debounce) === null || _e === void 0 ? void 0 : _e.minLength) || 0, 
                        // there is a bug when delay is set to 100, idk why yet so adding 1 ms if user sets it to 100
                        debounceTimeout: ((_f = config.debounce) === null || _f === void 0 ? void 0 : _f.delay) === undefined ||
                            ((_g = config.debounce) === null || _g === void 0 ? void 0 : _g.delay) === 100
                            ? 101
                            : (_h = config.debounce) === null || _h === void 0 ? void 0 : _h.delay }, node)));
                // default if array is not provided
                // add debounceing/throttling depending on which is enabled and return
            } // maybe account for other handlers besides button
        }
        // still need to filter by config.target
        if (isThrottleEnabled) {
            if (Array.isArray((_j = config.throttle) === null || _j === void 0 ? void 0 : _j.target)) {
            }
            else if (node.type === 'input') {
                return (React.createElement(React.Fragment, null,
                    React.createElement(Throttle, { onChange: node.props.onChange, minLength: ((_k = config.throttle) === null || _k === void 0 ? void 0 : _k.minLength) || 0, throttleTimeout: ((_l = config.throttle) === null || _l === void 0 ? void 0 : _l.delay) === undefined
                            ? 100
                            : (_m = config.throttle) === null || _m === void 0 ? void 0 : _m.delay }, node)));
                // default if array is not provided
                // add debounceing/throttling depending on which is enabled and return
            } // maybe account for other handlers besides button
        }
        // can filter for more node types and apply other wrappers below:
        // if node has children, recursively transform them to fit react props children array format
        if (node.props && node.props.children) {
            const children = React.Children.toArray(node.props.children).map(elementIsolator);
            return React.cloneElement(node, Object.assign(Object.assign({}, node.props), { children: children }));
        }
        return node;
    };
    // calls recursive function to apply FEO wrappers to each child
    const wrapper = (child, index) => {
        if (!React.isValidElement(child)) {
            return child;
        }
        // calls recursive function, add more checks here if necessary
        if (isLazyLoadEnabled || isDebounceEnabled || isThrottleEnabled) {
            return elementIsolator(child) || child;
        }
    };
    return (React.createElement(React.Fragment, null, React.Children.map(children, (child, index) => {
        return wrapper(child, index);
    })));
};
export default Fig;
