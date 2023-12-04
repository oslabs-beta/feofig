import React from 'react';
import LazyLoad from './utils/lazyload';

type Element = React.ReactElement;

type Config = {
  lazyload?: LazyLoadConfig
};

type LazyLoadConfig = {
    threshold?: number,
    once?: false,
}

type FigProps = {
    children: Element,
    config: Config,
    placeholder?: Element
}


const Fig = ({ children, config, placeholder }: FigProps) => {
  const isLazyLoadEnabled = config && config.lazyload;

  const wrapWithLazyLoad = (child: Element, index: number): Element => {
    if (isLazyLoadEnabled && React.isValidElement(child)) {
      return (
        <LazyLoad
          key={index}
          threshold={config.lazyload?.threshold || 0}
          placeholder={placeholder}
        >
          {child}
        </LazyLoad>
      );
    }
    return child;
  };

  return (
      React.Children.map(children, (child: Element, index: number) =>
        wrapWithLazyLoad(child, index)
      )
  );
};

export default Fig;
