import React from 'react';
// import Fig from 'feofig';
import lazyLoadConfig from './config.js';
import FigsForSale from './Home.js';
import './style.scss';

const App = () => {
  return (
    <div className='app'>
        <FigsForSale />
    </div>
      
  );
};

export default App;