import React, {useState, useEffect, useRef} from 'react';
import {useInView} from 'react-intersection-observer';
import PropTypes from 'prop-types';

// const LazyLoad = ({
//   children,
//   className = '',
//   classNamePrefix = 'lazyload',
//   once = false,
//   height,
//   offset = 0,
//   placeholder,
//   scrollContainer,
//   style,
//   unmountIfInvisible = false,
// }) => {
//   const [isVisible, setIsVisible] = useState(false);
//   const elementRef = useRef(null);

//   const getOffsets = (offsetProp) => {
//     return Array.isArray(offsetProp) ? offsetProp : [offsetProp, offsetProp];
//   };

//   useEffect(() => {
//     const observerOptions = {
//       root: scrollContainer || null,
//       rootMargin: `${getOffsets(offset)[0]}px ${getOffsets(offset)[1]}px`,
//       threshold: 0.01,
//     };

//     const observerCallback = (entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting || entry.intersectionRatio > 0) {
//           if (once) {
//             observer.disconnect();
//           }
//           setIsVisible(true);
//         } else if (!unmountIfInvisible) {
//           setIsVisible(false);
//         }
//       });
//     };

//     const observer = new IntersectionObserver(observerCallback, observerOptions);
//     if (elementRef.current) {
//       observer.observe(elementRef.current);
//     }

//     return () => {
//       if (observer) {
//         observer.disconnect();
//       }
//     };
//   }, [offset, once, scrollContainer, unmountIfInvisible]);

//   return (
//     <div
//       ref={elementRef}
//       className={`${classNamePrefix}-wrapper ${className}`}
//       style={style}
//     >
//       {isVisible ? (
//         children
//       ) : placeholder ? (
//         placeholder
//       ) : (
//         <div style={{ height: height }} className={`${classNamePrefix}-placeholder`} />
//       )}
//     </div>
//   );
// };

// LazyLoad.propTypes = {
//   className: PropTypes.string,
//   classNamePrefix: PropTypes.string,
//   once: PropTypes.bool,
//   height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
//   offset: PropTypes.oneOfType([
//     PropTypes.number,
//     PropTypes.arrayOf(PropTypes.number),
//   ]),
//   placeholder: PropTypes.node,
//   scrollContainer: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
//   style: PropTypes.object,
//   unmountIfInvisible: PropTypes.bool,
// };

// const LazyLoad = ({children, threshold = 0.5, once = true}) => {
//   const renderCounter = useRef(0);
//   renderCounter.current = renderCounter.current + 1;
//   const containerRef = useRef(null);
//   const [isVisible, setIsVisible] = useState(false);

//   const callbackFunction = (entries) => {
//     const [entry] = entries;
//     setIsVisible(entry.isIntersecting);
//   };

//   const options = {
//     root: null,
//     rootMargin: '0px',
//     threshold: 0.9,
//   };

//   useEffect(() => {
//     const observer = new IntersectionObserver(callbackFunction, options);
//     observer.observe(containerRef.current);

//     return () => {
//       if (containerRef.current) observer.unobserve(containerRef.current);
//     };
//   }, [containerRef, options]);

//   return (
//     <div>
//       <div ref={containerRef}>{isVisible ? children : <div></div>}
//       </div>
//     </div>

//   )

//   // return (
//   //   <div>
//   //     <div className='box' ref={containerRef}>
//   //       {isVisible ? <div className='box' ref={containerRef}>
//   //       FLSAHKFJSKAL;FJKASLJFALK;
//   //     </div> : "" }
//   //     </div>
//   //     <div className='box' ref={containerRef}>
//   //       {isVisible ? 'Observe me you pervert KEIDY' : 'lol no'}
//   //     </div>
//   //     <div className='box' ref={containerRef}>
//   //       Observe me you pervert KEIDY
//   //     </div>
//   //     <div className='box' ref={containerRef}>
//   //       Observe me you pervert KEIDY
//   //     </div>
//   //     <div className='box' ref={containerRef}>
//   //       Observe me you pervert KEIDY
//   //     </div>
//   //     <div className='box' ref={containerRef}>
//   //       Observe me you pervert KEIDY
//   //     </div>
//   //     <div className='box' ref={containerRef}>
//   //       Observe me you pervert KEIDY
//   //     </div>
//   //     <div className='box' ref={containerRef}>
//   //       Observe me you pervert KEIDY
//   //     </div>
//   //     <div className='box' ref={containerRef}>
//   //       Observe me you pervert KEIDY
//   //     </div>
//   //     <div className='box' ref={containerRef}>
//   //       Observe me you pervert KEIDY
//   //     </div>
//   //   </div>
//   // );
// };

// const LazyLoad = ({children, threshold = 0.5, once = true}) => {
//   // const renderCounter  = useRef(0);
//   // renderCounter.current = renderCounter.current + 1;
//   const options = {
//     root: null,
//     rootMargin: "0px",
//     threshold: threshold,
//     // trackVisibility: true,
//     // delay: 1000,
//     triggerOnce: once
//   };

//   const {ref, inView} = useInView(options);

//   console.log(children.props.children, "In view:", inView);

//   return (
//     <div ref={ref}>
//        <div>Renders in Lazy Load file: {renderCounter.current}</div>
//       {inView ? children : <div >Loading...</div>}
//     </div>
//   )
// }

// const LazyLoad = ({ children, threshold = 0.5, once = false }) => {
//   const [isVisible, setIsVisible] = useState(false);
//   const ref = useRef();

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//           if (once) {
//             observer.disconnect();
//           }
//         }
//       },
//       {
//         root: null,
//         rootMargin: '0px',
//         threshold: threshold,
//       }
//     );

//     if (ref.current) {
//       observer.observe(ref.current);
//     }

//     return () => {
//       if (observer) {
//         observer.disconnect();
//       }
//     };
//   }, [threshold, once]);

//   return (
//     <div ref={ref} style={{ minHeight: '1px' }}>
//       {isVisible ? children : <div >Loading...</div>}
//     </div>
//   );
// };

const LazyLoad = ({ src, alt, className, threshold }) => {
  const imgRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: threshold,
    };
    console.log(threshold)
    const handleIntersection = (entries, observer) => {
      entries.forEach((entry) => {
        console.log(`isIntersecting: ${entry.isIntersecting}`)
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.getAttribute('data-src');
          observer.unobserve(img);
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
  
  return <img ref={imgRef} className={`lazy ${className}`} data-src={src} alt={alt} />;
};

export default LazyLoad;
