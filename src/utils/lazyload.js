import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import PropTypes from 'prop-types';

const LazyLoad = ({
  children,
  src,
  alt,
  className,
  threshold,
  placeholder,
}) => {
  const imgRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: threshold,
    };

    // console.log("children: ", children)
    // console.log(Array.isArray(children))

    const handleIntersection = (entries, observer) => {
      entries.forEach((entry) => {
        console.log(`isIntersecting: ${entry.isIntersecting}`);
        if (entry.isIntersecting) {
          const element = entry.target;
          element.className = children.props.className;
          console.log(element.nodeName);

          if (element.nodeName === 'IMG') {
            // img.src = img.getAttribute('data-src');
            element.src = children.props.src;
            // element.className = children.props.className;
            observer.unobserve(element);
          } else {
            console.log('21321312', children.props.children);
            if (children.props.children.length) {
              console.log('in children.props.length');
              const childProps = [];
              children.props.children.forEach((prop) => {
                console.log('type: ', typeof prop);
                if (typeof prop !== 'object') childProps.push(prop);
              });
              element.innerHTML = childProps;
            }
            // element.children = children.props.children
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

  console.log('children: ', children);
  const returnRenderedElement = (child) => {
    if (child.type === 'img') {
      console.log(placeholder);
      if (placeholder)
        return <>{React.cloneElement(placeholder, { ref: imgRef })}</>;
      else
        return <>{React.cloneElement(children, { ref: imgRef, src: null })}</>;
    } else
      return (
        <>{React.cloneElement(children, { ref: imgRef, children: null })}</>
      );
  };

  const renderedElement = returnRenderedElement(children);
  // return <img ref={imgRef} className={`lazy ${className}`} data-src={src} alt={alt} />;
  return renderedElement;
};

export default LazyLoad;
