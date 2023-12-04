import React from 'react';
type Element = React.ReactElement;
type Config = {
    lazyload?: LazyLoadConfig;
};
type LazyLoadConfig = {
    threshold?: number;
    once?: false;
};
type FigProps = {
    children: Element;
    config: Config;
    placeholder?: Element;
};
declare const Fig: ({ children, config, placeholder }: FigProps) => Element[];
export default Fig;
