import React from 'react';
import {animationDisableConfig} from './config';
import Fig from '../../dev/feofig';

const AnimateComponent = () => {
  return (
      <Fig config={animationDisableConfig}>
    <div>
        <div className='animate' />
        <div className='animate' />
        <div className='animate' />
        <div className='animate' />
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
