import React, {useEffect} from 'react';
import Fig from '../../dev/feofig';
import lazyLoadConfig from "./config"
import image from "../public/placeholder.webp"
import Home from './Home.js';
import './style.scss';

const placeholder = 
<img src={image} alt='figs coming soon' className="fig-image"/>

const App = () => {
  // useEffect(() => {
  //   const observer = new PerformanceObserver((list) => {
  //     const a = list.getEntries()
  //     // console.log(a)
  //     // if (a.length === 1)
  //     console.log((a[a.length - 1].responseEnd - a[0].redirectStart))
  //   });
    
  //   observer.observe({ type: "resource", buffered: true });
  // }, [])

  
  return (
    <div className='app'>
      {/* <Fig config={lazyLoadConfig} placeholder={placeholder}> */}
        <Home />
      {/* </Fig> */}
    </div>
      
  );
};

export default App;