import React from 'react';
import LazyLoad from './utils/LazyLoad';

const Fig = ({ children, config }) => {
  const isLazyLoadEnabled = config && config.lazyload;

  const wrapWithLazyLoad = (child, index) => {
    if (isLazyLoadEnabled && React.isValidElement(child)) {
      return (
        <LazyLoad
          key={index}
          threshold={config.lazyload.threshold || 0}
          once={config.lazyload.once || false}
          height={config.lazyload.height || 200} // Default height, adjust as needed
          offset={config.lazyload.offset || [0, 0]} // Default offset, adjust as needed
        >
          {child}
        </LazyLoad>
      );
    }
    return child;
  };

  return (
    <>
      {React.Children.map(children, (child, index) => wrapWithLazyLoad(child, index))}
    </>
  );
};

export default Fig;