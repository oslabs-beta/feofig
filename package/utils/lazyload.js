import React, { useEffect, useRef } from 'react';

const LazyLoad = ({ children, threshold, placeholder }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: threshold || 0.5,
    };

    const handleIntersection = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;
          if (element.nodeName === 'IMG') {
            element.className = children.props.className; // replace placeholder className to img className
            element.src = children.props.src; // replace placeholder src to img src
            observer.unobserve(element);
          } else {
            element.innerHTML = children.props.children;
            observer.unobserve(element);
          }
        }
      });
    };
    const observer = new IntersectionObserver(handleIntersection, options);
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  const returnRenderedElement = (children) => {
    if (children.type === 'img') {
      if (placeholder)
        return React.cloneElement(placeholder, { ref: elementRef });
      else return React.cloneElement(children, { ref: elementRef, src: null });
    } else
      return React.cloneElement(children, { ref: elementRef, children: null });
  };

  const newReactElement = returnRenderedElement(children);

  return newReactElement;
};

export default LazyLoad;
