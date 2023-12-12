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
import { useState, useEffect, useRef, cloneElement, } from 'react';
const Debounce = (_a) => {
    var { onChange, value: propValue, minLength = 0, 
    // there is a bug when timeout is set to 100, idk why yet so adding 1 ms if user sets it to 100
    debounceTimeout = 101, children, inputRef } = _a, props = __rest(_a, ["onChange", "value", "minLength", "debounceTimeout", "children", "inputRef"]);
    const [value, setValue] = useState(typeof propValue === 'undefined' || propValue === null ? '' : propValue);
    const isDebouncing = useRef(false);
    const notify = useRef(null);
    // from https://levelup.gitconnected.com/debounce-from-scratch-8616c8209b54
    const debounce = (func, wait) => {
        let timerId;
        return (...args) => {
            clearTimeout(timerId);
            timerId = setTimeout(() => func(...args), wait);
        };
    };
    // Create the notifier based on debounceTimeout
    const createNotifier = (timeout) => {
        if (timeout < 0) {
            notify.current = () => null;
        }
        else if (timeout === 0) {
            notify.current = doNotify;
        }
        else {
            const debouncedChangeFunc = debounce((event) => {
                isDebouncing.current = false;
                doNotify(event);
            }, timeout);
            notify.current = (event) => {
                isDebouncing.current = true;
                debouncedChangeFunc(event);
            };
        }
    };
    useEffect(() => {
        if (isDebouncing.current) {
            return;
        }
        if (propValue !== undefined && propValue !== null && value !== propValue) {
            setValue(propValue);
        }
        // tested removing this to fix 100 bug but didn't change anything
        // if (debounceTimeout !== undefined && debounceTimeout !== 100) {
        createNotifier(debounceTimeout);
        // }
    }, [propValue, debounceTimeout]);
    const doNotify = (...args) => {
        onChange(...args);
    };
    const handleChange = (event) => {
        var _a, _b;
        event.persist();
        const { value: newValue } = event.target;
        setValue(newValue);
        if (newValue.length >= minLength) {
            (_a = notify.current) === null || _a === void 0 ? void 0 : _a.call(notify, event);
            return;
        }
        if (value.length > newValue.length) {
            (_b = notify.current) === null || _b === void 0 ? void 0 : _b.call(notify, Object.assign(Object.assign({}, event), { target: Object.assign(Object.assign({}, event.target), { value: '' }) }));
        }
    };
    const maybeRef = inputRef ? { ref: inputRef } : {};
    // const clonedChildren = Children.map(children, (child) => {
    //   return cloneElement(child as React.ReactElement, {
    //     ...props,
    //     onChange: handleChange,
    //     value,
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
export default Debounce;
