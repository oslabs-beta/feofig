import React, {useEffect, useRef} from 'react';

type LazyLoadProps = {
  key: number;
  children: React.ReactElement;
  threshold?: number;
  placeholder?: React.ReactElement | null;
};

const LazyLoad = ({children, threshold, placeholder}: LazyLoadProps) => {
  const elementRef = useRef<null>(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: threshold || 0.5,
    };

    const handleIntersection = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          // if (element.nodeName === 'IMG') {
            const imgElement = element as HTMLImageElement;
            imgElement.className = children.props.className; // replace placeholder className to img className
            imgElement.src = children.props.src; // replace placeholder src to img src
            observer.unobserve(element);
          // } else {
            // element.innerHTML = children.props.children;
            // observer.unobserve(element);
          // }
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
    if (children.type === 'img') {
      if (placeholder)
        return React.cloneElement(placeholder, {ref: elementRef});
      else return React.cloneElement(children, {ref: elementRef, src: null});
    } else return React.cloneElement(children, {ref: elementRef});
  };

  const newReactElement = returnRenderedElement(children);

  return newReactElement;
};

export default LazyLoad;
