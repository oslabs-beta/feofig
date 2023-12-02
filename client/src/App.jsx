import React from 'react';
// import Fig from 'feofig';
import lazyLoadConfig from './config.js';
import FigsForSale from './Home.js';
import './style.scss';

// const placeholderImage = (
//   <img
//     className='placeholder'
//     src='https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=is&k=20&c=_o_WQ-NIhIyiDOBe5kEHl9QAyUNeYxWz0d-oJkC2znk='
//     alt='Image Description'
//   />
// );

const App = () => {
  return (
    <div className='app'>
        <FigsForSale />
    </div>
      
  );
};

export default App;