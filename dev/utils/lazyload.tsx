import React, {useEffect, useRef} from 'react';
import {LazyLoadProps} from '../types/types';

const LazyLoad = ({
  children,
  threshold = 0,
  placeholder,
  once,
  offset = '0px',
}: LazyLoadProps) => {
  const elementRef = useRef<null>(null);

  useEffect(() => {
    const options = {
      root: null,
      // NEEDS CHANGE: rootmargin default to '0px 0px 0px 0px', currently only accepts one '-px'. 
      rootMargin: offset, // user config for offset
      threshold: threshold, // user config for threshold
    };

    const handleIntersection = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      entries.forEach((entry) => {
        const image = entry.target as HTMLImageElement;
        if (entry.isIntersecting) {
          image.className = children.props.className; // replace placeholder className to img className
          image.src = children.props.src; // replace placeholder src to img src
          if (once) observer.unobserve(image);
        } else if (!once && !entry.isIntersecting) {
          // prioritizes local image placeholder if it exists
          if (children.props.placeholder) {
            image.className = children.props.placeholder.props.className;
            image.src = children.props.placeholder.props.src;
          } else {
            image.className = placeholder?.props.className;
            image.src = placeholder?.props.src;
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

  const returnRenderedElement = (
    children: React.ReactElement
  ): React.ReactElement => {
    // prioritizes local image placeholder if it exists
    if (children.props.placeholder)
      return React.cloneElement(children.props.placeholder, {ref: elementRef});
    if (placeholder) return React.cloneElement(placeholder, {ref: elementRef});
    else return React.cloneElement(children, {ref: elementRef, src: null});
  };

  const newReactElement = returnRenderedElement(children);

  return newReactElement;
};

export default LazyLoad;
