import { useEffect, useRef, cloneElement } from 'react';
import styles from './animationDisable.module.css';
const AnimationDisable = ({ children, threshold = 0.5, offset = '0px', }) => {
    const elementRef = useRef(null);
    useEffect(() => {
        const options = {
            root: null,
            rootMargin: offset,
            threshold: threshold,
        };
        const handleIntersection = (entries, observer) => {
            entries.forEach((entry) => {
                const element = entry.target;
                if (entry.isIntersecting) {
                    // element.style.animationDuration = children?.style.animationDuration
                    element.classList.remove(styles.disable);
                    // element.classList.add(styles.disable);
                }
                else {
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
    return cloneElement(children, { ref: elementRef });
};
export default AnimationDisable;
