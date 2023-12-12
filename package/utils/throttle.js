var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { useState, useEffect, useRef, cloneElement } from 'react';
const Throttle = (_a) => {
    var { onChange, value: propValue, minLength, throttleTimeout, children, inputRef } = _a, props = __rest(_a, ["onChange", "value", "minLength", "throttleTimeout", "children", "inputRef"]);
    const [value, setValue] = useState(propValue !== null && propValue !== void 0 ? propValue : '');
    const timeoutRef = useRef(null);
    useEffect(() => {
        if (propValue !== undefined && propValue !== null && value !== propValue) {
            setValue(propValue);
        }
    }, [propValue]);
    const handleChange = (event) => {
        event.persist();
        const { value: newValue } = event.target;
        setValue(newValue);
        if (newValue.length >= minLength) {
            if (!timeoutRef.current) {
                // No existing timeout, create one and notify after throttling duration
                timeoutRef.current = setTimeout(() => {
                    timeoutRef.current = null;
                    onChange(event);
                }, throttleTimeout);
            }
        }
        else {
            // Clear existing timeout if length is less than minLength
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    };
    const maybeRef = inputRef ? { ref: inputRef } : {};
    // const clonedChildren = Children.map(children, (child) => {
    //   return cloneElement(child as ReactElement, {
    //     ...props,
    //     onChange: handleChange,
    //     value: value,
    //     ...maybeRef,
    //   });
    // });
    // return <>{clonedChildren}</>;
    const returnRenderedElement = (children) => {
        return cloneElement(children, Object.assign(Object.assign(Object.assign({}, props), { onChange: handleChange, value }), maybeRef));
    };
    const newReactElement = returnRenderedElement(children);
    return newReactElement;
};
export default Throttle;
