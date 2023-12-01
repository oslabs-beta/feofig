import React from 'react';
import LazyLoad from './utils/lazyload.ts';

const Fig = ({ children, config, placeholder }) => {

  const recursiveWrap = (child) => {
    if (typeof child !== 'object') {
      return child;
    }
    if (Array.isArray(child.props.children)) {
      const newArray = child.props.children.map((child) => {
        return recursiveWrap(child);
      });

      return newArray;
    } else if (typeof child.props.children === 'string') {
      // this case is testing for just strings, so it will lazy load the div that only has a string for children. In LazyLoad.js, need to set the innerHTML equal to child, since child is a string.
      return (
        <LazyLoad
          key={crypto.randomUUID()}
          placeholder={placeholder}
        >
          {child}
        </LazyLoad>
      );
    } else if (typeof child.props.children === 'object') {
      return recursiveWrap(child.props.children); // the issue here is that this needs to return <LazyLoad>{recursiveWrap(child.props.children)}</LazyLoad> but it cant because it'll throw an error: 'cant read properties of undefined, reading "type"'.
    } else {
      return (
        <LazyLoad key={crypto.randomUUID()} placeholder={placeholder}>
          {child}
        </LazyLoad>
      );
    }
  };

  const array = Array.isArray(children) ? (
    children.map((child) => {
      return recursiveWrap(child);
    })
  ) : (
    <LazyLoad key={crypto.randomUUID()} placeholder={placeholder}>
      {children}
    </LazyLoad>
  );

  return array;
};

export default Fig;
