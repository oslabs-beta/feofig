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
        return recursiveWrap(child);
      });
      
      return newArray;

    } 
    else if (typeof child.props.children !== 'object') { // this case is testing for just strings, so it will lazy load the div that only has a string for children. In LazyLoad.js, need to set the innerHTML equal to child, since child is a string.
      return <LazyLoad key={crypto.randomUUID()} renderInnerHTML={true}>{child}</LazyLoad>
    }
    
    else {
      return <LazyLoad key={crypto.randomUUID()}>{child}</LazyLoad>;
    }
  };

  const array = children.map((child) => {
    return recursiveWrap(child);
  });

  return array;
};

export default Fig;
