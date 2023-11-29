import React from 'react';
import LazyLoad from './utils/lazyload';

const Fig = ({ children, config, placeholder }) => {
  const isLazyLoadEnabled = config && config.lazyload;

  const wrapWithLazyLoad = (child, index) => {
    if (isLazyLoadEnabled && React.isValidElement(child)) {
      // console.log(child.props.className)
      if (Array.isArray(child.props.children)) {
        // console.log("THISSS: ", child.props.children)
        // return wrapWithLazyLoad(child.children);
        // const wrappedChildren = React.Children.map(child.props.children, (nestedChild, nestedIndex) => wrapWithLazyLoad(nestedChild, nestedIndex))
        // return React.cloneElement(child, {...child.props, key:index, wrappedChildren});

        // child.props.children.forEach(nestedChild => {
        //   console.log('THE CHILD: ', nestedChild.props)
        //   if (typeof child === 'object') {
        //     // console.log(child.props.children)
            
        //   }
        // //  return wrapWithLazyLoad(child, index)
        // })
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