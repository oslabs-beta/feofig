import React, { useState, useEffect, useRef, Children, cloneElement, ChangeEvent, ReactNode, ReactElement } from 'react';
import { ThrottleProps } from '../types/types';

const Throttle = ({
  onChange,
  value: propValue,
  minLength,
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

  const clonedChildren = Children.map(children, (child) => {
    return cloneElement(child as ReactElement, {
      ...props,
      onChange: handleChange,
      value: value,
      ...maybeRef,
    });
  });

  return <>{clonedChildren}</>;
};

export default Throttle;