import React from 'react';
import Fig from './FeoFig.js';
import lazyLoadConfig from './examples/config.js';
import Widget from './components/Widget.jsx';
import './App.scss';

const App = () => {
  // const renderCounter  = useRef(0);
  // renderCounter.current = renderCounter.current + 1;
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

  const widgets = [];

  for (let i = 1; i <= 10; i++) {
    widgets.push(<Widget id={`widget${i}`} count={i}></Widget>);
  }

  // return (
  //   <Fig config={lazyLoadConfig}>
  //     {widgets}
  //   </Fig>
  // );

  // return (
  //   <div style={{display:'flex', flexDirection:'column', height: '1000000px', width: '50%'}}>
  //     <Fig config={lazyLoadConfig}>
  //       <img src='https://rockschool.com/wp-content/uploads/2013/03/RS2013_0304web.jpg'></img>
  //       <div style={{height: '10000px', width: '50%', backgroundColor:'grey'}}>Grey Box
  //       </div>
  //       <div style={{height: '10000px', width: '50%', backgroundColor:'black'}}>Black Box
  //       </div>
  //       <div style={{height: '10000px', width: '50%', backgroundColor:'purple'}}>Purple Box
  //       </div>
  //     </Fig>
  //   </div>
  // );

  // return (
  //   <div className='app'>
  //     {/* <div className='isVisible'>
  //       {isVisible ? 'IN VIEWPORT' : 'NOT IN VIEWPORT'}
  //     </div>
  //     <div className='section'></div> */}

  //       {/* <Fig config={config1}>

  //       </Fig> */}
  //     {/* <div className='box' ref={containerRef}>
  //       Observe me you pervert ANDY LAM
  //     </div>
  //     <div className='box' ref={containerRef}>
  //       Observe me you pervert Zack Rauzi
  //     </div> */}
  //   </div>
  // );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '50%',
      }}
    >
      <div
        style={{
          height: '100px',
          width: '50%',
          backgroundColor: 'grey',
          margin: '50px',
        }}
      >
        Grey Box
      </div>
      <div
        style={{
          height: '200px',
          width: '50%',
          backgroundColor: 'black',
          margin: '50px',
        }}
      >
        Black Box
      </div>
      <div
        style={{
          height: '100px',
          width: '50%',
          backgroundColor: 'grey',
          margin: '50px',
        }}
      >
        Grey Box
      </div>
      <div
        style={{
          height: '200px',
          width: '50%',
          backgroundColor: 'black',
          margin: '50px',
        }}
      >
        Black Box
      </div>
      <Fig config={lazyLoadConfig}>
        <img
          className="comic"
          src="https://dummyimage.com/700x300.png"
          alt="Image Description"
        />
        <div className="comic"> H E L L O </div>
        <img
          className="comic"
          src="https://images.unsplash.com/photo-1472457897821-70d3819a0e24?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Image Description"
        />
        <img
          className="comic"
          src="https://images.unsplash.com/photo-1523169054-66018b90af5e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Image Description"
        />
        <img
          className="comic"
          src="https://dummyimage.com/700x300.png"
          alt="Image Description"
        />
        <div className="comic">
          GOOD BYE
          <div className="comic"> 12121 BY212121E </div>
          <div className="comic"> GgdsgasdOOD BgsagsaYE </div>
          <div className="comic"> GOdbzbsbe OD 4353BYE </div>{' '}
        </div>
        <div className="comic"> GOOD BYE </div>
        <div className="comic"> GOOD BYE </div>
        <div className="comic"> GOOD BYE </div>
        <div className="comic"> GOOD BYE </div>
      </Fig>
    </div>
  );
};

export default App;

//threshold controls how much of div has to be on screen
//threshold = 1 means 100% of div has to be on screen
//threshold needs to be able to be configured by div
