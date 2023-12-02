import React from 'react';
type LazyLoadProps = {
    children: React.ReactElement;
    threshold?: number;
    placeholder?: React.ReactElement | null;
};
declare const LazyLoad: React.FC<LazyLoadProps>;
export default LazyLoad;
