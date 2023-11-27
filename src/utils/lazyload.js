import React, {useState, useEffect, useRef} from 'react';

const LazyLoadComponent = ({children, threshold = 0.1, once = true}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.disconnect();
          }
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: threshold,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [threshold, once]);

  return (
    <div ref={ref} style={{display: isVisible ? 'block' : 'none'}}>
      {isVisible && children}
    </div>
  );
};

export default LazyLoadComponent;
