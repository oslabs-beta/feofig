import React, { useState, useEffect, useRef, cloneElement, ChangeEvent } from 'react';
import { ThrottleProps } from '../types/types';

const Throttle = ({
  onChange,
  value: propValue,
  minLength = 0,
  throttleTimeout,
  children,
  inputRef,
  ...props
}:ThrottleProps) => {
  const [value, setValue] = useState<string>(propValue ?? '');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (propValue !== undefined && propValue !== null && value !== propValue) {
      setValue(propValue);
    }
  }, [propValue]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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
      clearTimeout(timeoutRef.current!);
      timeoutRef.current = null;
    }
  };

  const maybeRef = inputRef ? { ref: inputRef } : {};


  const returnRenderedElement = (children: React.ReactElement) => {
    return cloneElement(children as React.ReactElement, {
      ...props,
      onChange: handleChange,
      value,
      ...maybeRef,
    });
  };

  const newReactElement = returnRenderedElement(children as React.ReactElement);

  return newReactElement;
};

export default Throttle;