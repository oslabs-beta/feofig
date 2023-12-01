import React from 'react';
import LazyLoad from './utils/lazyload';

const Fig = ({ children, config, placeholder }) => {
  // console.log(children)

  const recursiveWrap = (child) => {
    // console.log(child)
    if (typeof child !== 'object') {
      return child;
    }
    if (Array.isArray(child.props.children)) {
      // console.log(child.props.children)
      const newArray = child.props.children.map((child) => {
        // console.log(child)
        return recursiveWrap(child);
      });

      return newArray;
    } else if (typeof child.props.children === 'string') {
      // this case is testing for just strings, so it will lazy load the div that only has a string for children. In LazyLoad.js, need to set the innerHTML equal to child, since child is a string.
      return (
        <LazyLoad
          key={crypto.randomUUID()}
          renderInnerHTML={true}
          placeholder={placeholder}
        >
          {child}
        </LazyLoad>
      );
    } else if (typeof child.props.children === 'object') {
      console.log(child.props.children)
      return recursiveWrap(child.props.children); // the issue here is that this needs to return <LazyLoad>{recursiveWrap(child.props.children)}</LazyLoad> but it cant because it'll throw an error: 'cant read properties of undefined, reading "type"'.
    } else {
      return (
        <LazyLoad key={crypto.randomUUID()} placeholder={placeholder} a='a'>
          {child}
        </LazyLoad>
      );
    }
  };

  const array = children.map((child) => {
    return recursiveWrap(child);
  });

  return array;
};

export default Fig;
