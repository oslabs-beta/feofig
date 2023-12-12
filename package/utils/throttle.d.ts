import React from 'react';
import { ThrottleProps } from '../types/types';
declare const Throttle: ({ onChange, value: propValue, minLength, throttleTimeout, children, inputRef, ...props }: ThrottleProps) => React.ReactElement<any, string | React.JSXElementConstructor<any>>;
export default Throttle;
