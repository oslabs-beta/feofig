import React from 'react';
import { DebounceProps } from '../types/types';
declare const Debounce: ({ onChange, value: propValue, minLength, debounceTimeout, children, inputRef, ...props }: DebounceProps) => React.ReactElement<any, string | React.JSXElementConstructor<any>>;
export default Debounce;
