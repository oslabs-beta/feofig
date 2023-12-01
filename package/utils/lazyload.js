import React, { useEffect, useRef, useState } from 'react';

const LazyLoad = ({children, renderInnerHTML}) => {
  // console.log(children)
  const newReactElement = React.cloneElement(children, { hello: '69', renderInnerHTML: renderInnerHTML })
  console.log(newReactElement)
  return newReactElement;
};

export default LazyLoad;
