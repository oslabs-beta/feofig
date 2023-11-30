import React from 'react';
import LazyLoad from './utils/lazyload';

const Fig = ({ children, config, placeholder }) => {
  const isLazyLoadEnabled = config && config.lazyload;

  const wrapWithLazyLoad = (child, index) => {
    if (isLazyLoadEnabled && React.isValidElement(child)) {
      if(typeof child === 'string') {
        console.log('STRING');
      }
      if (typeof child === 'function') {
        console.log('FUNCTION')
      }
      // console.log(child.props.className)
      if (Array.isArray(child.props.children)) {
        // return wrapWithLazyLoad(child.children);
        child.props.children.forEach(child => {
          // console.log(child)
          if (typeof child === 'object') {
            console.log(child.props.children)
            
          }
          wrapWithLazyLoad(child, index)})
      }
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