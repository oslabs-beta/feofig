import React from 'react';
import LazyLoad from './utils/lazyload';

const Fig = ({ children, config }) => {
  const isLazyLoadEnabled = config && config.lazyload;

  const wrapWithLazyLoad = (child, index) => {
    if (isLazyLoadEnabled && React.isValidElement(child)) {
      console.log(child.props.className)
      return (
        <LazyLoad
          key={index}
          threshold={config.lazyload.threshold || 0}
          once={config.lazyload.once || false}
          height={config.lazyload.height || 200} // Default height, adjust as needed
          offset={config.lazyload.offset || [0, 0]} // Default offset, adjust as needed
          src={child.props.src}
          alt={child.props.alt}
          className={child.props.className}
        >
          {child}
          {/* {React.cloneElement(child, { className: `lazy ${child.props.className || ''}`, 'data-src': child.props.src })} */}
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