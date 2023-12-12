import React, {useEffect, useRef, cloneElement} from 'react';
import {AnimationDisableProps} from '../types/types';
import styles from './animationDisable.module.css';

const AnimationDisable = ({
  children,
  threshold = 0.5,
  offset = '0px',
}: AnimationDisableProps) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: offset,
      threshold: threshold,
    };

    const handleIntersection = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      entries.forEach((entry) => {
        const element = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          // element.style.animationDuration = children?.style.animationDuration
          element.classList.remove(styles.disable);
          // element.classList.add(styles.disable);
        } else {
          //element.style.animationDuration = '0s !important';
          element.classList.add(styles.disable);
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

  return cloneElement((children as React.ReactElement), {ref: elementRef});
};

export default AnimationDisable;