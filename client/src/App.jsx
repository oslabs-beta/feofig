import React from 'react';
import Fig from '../../dev/feofig';
import {config1} from "./config"
import image from "../public/placeholder.webp"
import Home from './Home.js';
import './style.scss';

const placeholder = 
<img src={image} alt='figs coming soon' className="fig-image"/>

const App = () => {
  return (
    <div className='app'>
      <Fig config={config1} placeholder={placeholder}>
        <Home />
      </Fig>
    </div>
      
  );
};

export default App;