import React from 'react';
import LazyLoad from './utils/lazyload';

const Fig = ({ children, config, placeholder }) => {
  const isLazyLoadEnabled = config && config.lazyload;

  const wrapWithLazyLoad = (child, index) => {
    if (isLazyLoadEnabled && React.isValidElement(child)) {
      return (
        <LazyLoad
          key={index}
          threshold={config.lazyload.threshold || 0}
          src={child.props.src}
          alt={child.props.alt}
          className={child.props.className} mo
          placeholder={placeholder}
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