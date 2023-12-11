import React from 'react';
type LazyLoadProps = {
    key: number;
    children: React.ReactElement;
    threshold?: number;
    placeholder?: React.ReactElement | null;
};
declare const LazyLoad: ({ children, threshold, placeholder, }: LazyLoadProps) => React.ReactElement<any, string | React.JSXElementConstructor<any>>;
export default LazyLoad;
