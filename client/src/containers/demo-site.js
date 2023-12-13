import React from 'react';
import Fig from 'feofig';
import {lazyLoadConfig} from '../config.js';
import image from '../../public/placeholder.webp';
import figs from '../components/FigList.js';
import '../style.scss';

const placeholder = (
  <img src={image} alt='figs coming soon' className='fig-image' />
); // might need to change the formatting for placeholder and what it accepts

const Home = () => {
  return (
    <Fig config={lazyLoadConfig}>
      <div className='figs-page'>
        <header className='figs-header'>
          <h1>The Fig Boutique</h1>
          <p>Welcome to your one-stop shop for exquisite fig varieties!</p>
        </header>

        {/* <Fig config={lazyLoadConfig}> */}
        <div className='figs-container'>
          {figs.map((fig) => (
            <div key={fig.id} className='fig-item'>
              <img
                src={fig.imageUrl}
                alt={fig.name}
                className='fig-image'
                placeholder={placeholder}
              />
              <h3>{fig.name}</h3>
              <p>{fig.description}</p>
              <button className='buy-button'>Buy Now</button>
            </div>
          ))}
        </div>
        {/* </Fig> */}

        <footer className='figs-footer'>
          <p>© 2023 FeoFig. All rights reserved.</p>
        </footer>
      </div>
    </Fig>
  );
};

export default Home;
