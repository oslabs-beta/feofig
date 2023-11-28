import React, {useState} from 'react';
import LazyLoad from '../utils/LazyLoad';
import Widget from '../components/Widget';
// import Operation from '../components/Operation';
// import { uniqueId } from '../utils';

const Normal = () => {
  // Create initial state
  const [arr, setArr] = useState(
    Array.from({length: 20}, (_, index) => ({
      uniqueId: uniqueId(),
      once: [6, 7].includes(index),
    }))
  );

  function uniqueId() {
    return (Math.random().toString(36) + '00000000000000000').slice(2, 10);
  }

  // // Function to handle click events
  // const handleClick = () => {
  //   const id = uniqueId();
  //   setArr(arr.map(el => ({ ...el, uniqueId: id })));
  // };

  return (
    <div className='wrapper'>
      {/* <Operation type="normal" onClickUpdate={handleClick} /> */}
      <div className='widget-list'>
        {arr.map((el, index) => (
          <LazyLoad once={el.once} key={index} height={200} offset={[-100, 0]}>
            <Widget once={el.once} id={el.uniqueId} count={index + 1} />
          </LazyLoad>
        ))}
      </div>
    </div>
  );
};

export default Normal;
