import React, { useEffect, useRef, cloneElement } from 'react';
import { PauseAnimationProps } from '../types/types';
import styles from './pauseAnimation.module.css';

const PauseAnimation = ({
  children,
  threshold = 0.5,
  offset = '0px',
}: PauseAnimationProps) => {
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
          element.classList.remove(styles.pause);
        } else {
          element.classList.add(styles.pause);
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

  return cloneElement(children as React.ReactElement, { ref: elementRef });
};

export default PauseAnimation;
