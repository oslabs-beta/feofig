import React, { useEffect, useRef } from 'react';

const LazyLoad = ({ children, src, alt, className, threshold, placeholder }) => {
  const imgRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: threshold,
    };

    const handleIntersection = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;
          element.className = children.props.className;
          
          if (element.nodeName === 'IMG') {
            element.src = children.props.src;
            observer.unobserve(element);
          } else {
            const childProps = [];
            if (Array.isArray(children.props.children)) {
              // console.log("@@@@@@@@@@@@@: ", children.props.children.length, "!!!!!!!!!!: ", children.props.children)
              children.props.children.forEach((prop) => {
                if (typeof prop !== "object") childProps.push(prop)
              })
          } else childProps.push(children.props.children)
            element.innerHTML = childProps;
            observer.unobserve(element);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []); // Empty dependency array to run the effect only once on mount

  const returnRenderedElement = (child) => {
    if (child.type === 'img'){
      if (placeholder) return <>{React.cloneElement(placeholder, { ref: imgRef})}</>;
      else 
      return <>{React.cloneElement(children, { ref: imgRef, src: null})}</>;      
    }
    else
      return <>{React.cloneElement(children, { ref: imgRef, children: null})}</>;
  };

  const renderedElement = returnRenderedElement(children);
  
  return renderedElement
};

export default LazyLoad;
