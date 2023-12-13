import React, {
  useState,
  useEffect,
  useRef,
  cloneElement,
  ChangeEvent,
} from 'react';
import {DebounceProps} from '../types/types';

const Debounce = ({
  onChange,
  value: propValue,
  minLength = 0,
  // there is a bug when timeout is set to 100, idk why yet so adding 1 ms if user sets it to 100
  debounceTimeout = 101,
  children,
  inputRef,
  ...props
}: DebounceProps) => {
  const [value, setValue] = useState<string>(
    typeof propValue === 'undefined' || propValue === null ? '' : propValue
  );
  const isDebouncing = useRef<boolean>(false);
  const notify = useRef<((...args: any[]) => void) | null>(null);

  // from https://levelup.gitconnected.com/debounce-from-scratch-8616c8209b54
  const debounce = (func: (...args: any[]) => void, wait: number) => {
    let timerId: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => func(...args), wait);
    };
  };

  // Create the notifier based on debounceTimeout
  const createNotifier = (timeout: number) => {
    if (timeout < 0) {
      notify.current = () => null;
    } else if (timeout === 0) {
      notify.current = doNotify;
    } else {
      const debouncedChangeFunc = debounce(
        (event: ChangeEvent<HTMLInputElement>) => {
          isDebouncing.current = false;
          doNotify(event);
        },
        timeout
      );

      notify.current = (event: ChangeEvent<HTMLInputElement>) => {
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

  const doNotify = (...args: any[]) => {
    onChange(...args);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();
    const {value: newValue} = event.target;

    setValue(newValue);

    if (newValue.length >= minLength) {
      notify.current?.(event);
      return;
    }

    if (value.length > newValue.length) {
      notify.current?.({...event, target: {...event.target, value: ''}});
    }
  };

  const maybeRef = inputRef ? {ref: inputRef} : {};

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

export default Debounce;
