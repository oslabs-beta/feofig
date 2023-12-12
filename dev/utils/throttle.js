import React, { useState, useEffect, useRef, Children, cloneElement } from 'react';

const Throttle = ({
  // element: Element,
  // onChange,
  // value: propValue,
  // minLength,
  // throttleTimeout,
  // inputRef,
  // ...props

  onChange,
  value: propValue,
  minLength,
  throttleTimeout,
  children,
  inputRef,
  ...props
}) => {
  const [value, setValue] = useState(typeof propValue === 'undefined' || propValue === null ? '' : propValue);
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
    } else {
      // Clear existing timeout if length is less than minLength
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
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

export default Throttle;