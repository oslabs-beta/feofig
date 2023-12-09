import React, { useState, useEffect, useRef } from 'react';

const Throttle = ({
  element: Element,
  onChange,
  value: propValue,
  minLength,
  throttleTimeout,
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

  return (
    <Element
      {...props}
      onChange={handleChange}
      value={value}
      {...maybeRef}
    />
  );
};

export default Throttle;