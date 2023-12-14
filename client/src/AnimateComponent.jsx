import React from 'react';
import {pauseAnimationConfig} from './config';
import Fig from '../../dev/feofig';

const AnimateComponent = () => {
  return (
      <Fig config={pauseAnimationConfig}>
    <div>
        <div className='animate' />
        <div className='animate' />
        <div className='animate' />
        <div className='animate' />
        <div className='animate' />
        <div className='animate' />
        <div className='animate' />
    </div>
      </Fig>
  );
};

export default AnimateComponent;
