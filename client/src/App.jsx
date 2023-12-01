import React from 'react';
import Fig from '../../package/feofig.js';
import lazyLoadConfig from './examples/config.js';
import './App.scss';

const App = () => {  
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
      <Fig config={lazyLoadConfig}
              placeholder={
                <img
                  className="placeholder"
                  src="https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=is&k=20&c=_o_WQ-NIhIyiDOBe5kEHl9QAyUNeYxWz0d-oJkC2znk="
                  alt="Image Description"
                />
              }>
        <img
          className="comic"
          src="https://dummyimage.com/700x300.png"
          alt="Image Description"
        />
        <div style={{display:"flex", flexDirection:'column', height:'1000px', width:'300px', backgroundColor:"grey"}}> H E L L O
          <div style={{height:'500px', width:'300px', backgroundColor:"grey"}}>hello
          <div>999999999</div></div>
          <div style={{height:'500px', width:'300px',  backgroundColor:"pink"}}>goodbye</div> 
        </div>
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
        <div style={{height:'1000px', backgroundColor:'grey'}}>
          GOOD BYE
        </div>
      </Fig>
    </div>
  );
};

export default App;

//threshold controls how much of div has to be on screen
//threshold = 1 means 100% of div has to be on screen
//threshold needs to be able to be configured by div
