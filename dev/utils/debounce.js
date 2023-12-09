import React, { useState, useEffect, useRef, Children, cloneElement } from 'react';

const Debounce = ({
  onChange,
  value: propValue,
  minLength,
  debounceTimeout,
  children,
  inputRef,
  ...props
}) => {
  const [value, setValue] = useState(typeof propValue === 'undefined' || propValue === null ? '' : propValue);
  const isDebouncing = useRef(false);
  const notify = useRef();

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
    } else if (timeout === 0) {
      notify.current = doNotify;
    } else {
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

    if (debounceTimeout !== undefined && debounceTimeout !== 100) {
      createNotifier(debounceTimeout);
    }
  }, [propValue, debounceTimeout]);

  const doNotify = (...args) => {
    onChange(...args);
  };

  const handleChange = (event) => {
    event.persist();
    const { value: newValue } = event.target;
  
    setValue(newValue);
  
    if (newValue.length >= minLength) {
      notify.current(event);
      return;
    }
  
    if (value.length > newValue.length) {
      notify.current({ ...event, target: { ...event.target, value: '' } });
    }
  };

  const maybeRef = inputRef ? { ref: inputRef } : {};

  const clonedChildren = Children.map(children, (child) => {
    return cloneElement(child, {
      ...props,
      onChange: handleChange,
      value: value,
      ...maybeRef,
    });
  });

  return <>{clonedChildren}</>;
};

export default Debounce;