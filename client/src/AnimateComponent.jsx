import React from 'react'
import { AnimationDisableConfig } from './config'
import Fig from '../../dev/feofig'

const AnimateComponent = () => {
  return (
    <Fig config={AnimationDisableConfig}>
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
    <div className='animate' />
    </Fig>
  )
}

export default AnimateComponent