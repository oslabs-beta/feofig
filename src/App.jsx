import React, {useState, useRef, useEffect} from 'react';
import Home from './components/Home.jsx';
import Fig from './FeoFig.js';
import './App.scss';

const App = () => {
  // const containerRef = useRef(null);
  // const [isVisible, setIsVisible] = useState(false);

  // const callbackFunction = (entries) => {
  //   const [entry] = entries;
  //   setIsVisible(entry.isIntersecting);
  // };

  // const options = {
  //   root: null,
  //   rootMargin: '0px',
  //   threshold: 0.1,
  // };

  // useEffect(() => {
  //   const observer = new IntersectionObserver(callbackFunction, options);
  //   observer.observe(containerRef.current);

  //   return () => {
  //     if (containerRef.current) observer.unobserve(containerRef.current);
  //   };
  // }, [containerRef, options]);

  return (
    <div className='app'>
      {/* <div className='isVisible'>
        {isVisible ? 'IN VIEWPORT' : 'NOT IN VIEWPORT'}
      </div>
      <div className='section'></div> */}
      <Home />
      {/* <div className='box' ref={containerRef}>
        Observe me you pervert ANDY LAM
      </div>
      <div className='box' ref={containerRef}>
        Observe me you pervert Zack Rauzi
      </div> */}
    </div>
  );
};

export default App;

//threshold controls how much of div has to be on screen
//threshold = 1 means 100% of div has to be on screen
//threshold needs to be able to be configured by div
