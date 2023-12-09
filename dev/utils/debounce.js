import React, { useState, useEffect, useRef } from 'react';

const Debounce = ({
  element: Element,
  type,
  onChange,
  onKeyDown,
  onBlur,
  value: propValue,
  minLength,
  debounceTimeout,
  forceNotifyByEnter,
  forceNotifyOnBlur,
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

  const forceNotify = (event) => {
    if (!isDebouncing.current && debounceTimeout > 0) {
      return;
    }

    notify.current && notify.current();

    const { value: stateValue } = value;
    if (stateValue.length >= minLength) {
      doNotify(event);
    } else {
      doNotify({ ...event, target: { ...event.target, value: stateValue } });
    }
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

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      forceNotify(event);
    }

    if (onKeyDown) {
      event.persist();
      onKeyDown(event);
    }
  };

  const handleBlur = (event) => {
    forceNotify(event);

    if (onBlur) {
      event.persist();
      onBlur(event);
    }
  };

  const maybeOnKeyDown = forceNotifyByEnter ? { onKeyDown: handleKeyDown } : onKeyDown ? { onKeyDown } : {};
  const maybeOnBlur = forceNotifyOnBlur ? { onBlur: handleBlur } : onBlur ? { onBlur } : {};
  const maybeRef = inputRef ? { ref: inputRef } : {};

  return (
    <Element
      {...props}
      onChange={handleChange}
      value={value}
      {...maybeOnKeyDown}
      {...maybeOnBlur}
      {...maybeRef}
    />
  );
};

// Debounce.propTypes = {
//   element: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
//   type: PropTypes.string,
//   onChange: PropTypes.func.isRequired,
//   onKeyDown: PropTypes.func,
//   onBlur: PropTypes.func,
//   value: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.number
//   ]),
//   minLength: PropTypes.number,
//   debounceTimeout: PropTypes.number,
//   forceNotifyByEnter: PropTypes.bool,
//   forceNotifyOnBlur: PropTypes.bool,
//   inputRef: PropTypes.func
// };

// Debounce.defaultProps = {
//   element: 'input',
//   type: 'text',
//   onKeyDown: undefined,
//   onBlur: undefined,
//   value: undefined,
//   minLength: 0,
//   debounceTimeout: 100,
//   forceNotifyByEnter: true,
//   forceNotifyOnBlur: true,
//   inputRef: undefined
// }

export default Debounce;