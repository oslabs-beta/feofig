import React from 'react';
// import Fig from 'feofig';
import lazyLoadConfig from './config.js';
import FigsForSale from './FigsForSale.js';
import './App.scss';

const placeholderImage = (
  <img
    className='placeholder'
    src='https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=is&k=20&c=_o_WQ-NIhIyiDOBe5kEHl9QAyUNeYxWz0d-oJkC2znk='
    alt='Image Description'
  />
);

const App = () => {
  return (
    <div className='app'>
        <FigsForSale />
    </div>
      
  );
};

export default App;

//threshold controls how much of div has to be on screen
//threshold = 1 means 100% of div has to be on scree


{/* <img
className=''
src='https://wallpapercave.com/wp/t3WM9Nf.jpg'
alt='Image Description'
/>
<img
className='comic'
src='https://dummyimage.com/700x300.png'
alt='Image Description'
/>
<img
className='comic'
src='https://images.unsplash.com/photo-1472457897821-70d3819a0e24?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
alt='Image Description'
/>
<img
className='comic'
src='https://images.unsplash.com/photo-1523169054-66018b90af5e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
alt='Image Description'
/>
<img
className='comic'
src='https://dummyimage.com/700x300.png'
alt='Image Description'
/> */}
//threshold needs to be able to be configured by div
