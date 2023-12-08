import React, {useEffect, useRef} from 'react';

type LazyLoadProps = {
  key: string;
  children: React.ReactElement;
  threshold?: number;
  placeholder?: React.ReactElement | null;
  once?: boolean;
};

const LazyLoad = ({children, threshold, placeholder, once}: LazyLoadProps) => {
  const elementRef = useRef<null>(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: threshold,
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
          image.className = placeholder?.props.className;
          image.src = placeholder?.props.src;
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
    if (placeholder) return React.cloneElement(placeholder, {ref: elementRef});
    else return React.cloneElement(children, {ref: elementRef, src: null});
  };

  const newReactElement = returnRenderedElement(children);

  return newReactElement;
};

export default LazyLoad;
