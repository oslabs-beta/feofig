import React, {useState} from 'react';
import Debounce from '../../dev/utils/debounce.tsx';
import Home from './Home';
import Throttle from '../../dev/utils/throttle.tsx';
import Fig from '../../dev/feofig';
import {config1, config2, debounceConfig, debounceConfig2, throttleConfig} from './config';

const ExampleComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [figSearchTerm, setFigSearchTerm] = useState('');
  const [figSearchTermThrottle, setFigSearchTermThrottle] = useState('');
  const [searchTermThrottle, setSearchTermThrottle] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  return (
    <>
      {/* <Fig config={debounceConfig}> */}
        <div className={'figdebounceInput'}>
          <h1>Fig Debounced Search Example</h1>
          <div>
            {/* <textarea /> */}
            <input
              type='text'
              onChange={(event) => {
                setFigSearchTerm(event.target.value);
              }}
            />{' '}
            {/* <- input element wrapped with Debounce */}
          </div>
          <div>
            <strong>Current Search Term:</strong> {figSearchTerm}
          </div>
        </div>
        <div>
          <h1>Debounced Form Example</h1>
          <form onSubmit={(event) => {
                event.preventDefault();
                console.log('Saved');
                // Add your autosave logic here
              }}>
            <label>
              Notes:<br />
              <textarea
                onChange={(event) => {
                  console.log('Contents saved:', event.target.value)
                }}
              />
            </label>
            <br />
            <button type="save">Save</button>
          </form>
        </div>
      {/* </Fig> */}
      <Fig config={debounceConfig2}>
        <div className='figdebounceSelect'>
          <h1>Debounced Select Example</h1>
          <select
            onChange={(event) => setSelectedOption(event.target.value)}
            value={selectedOption}
          >
            <option value="">Select an option</option>
            <option value="First option">Option 1</option>
            <option value="Second option">Option 2</option>
            <option value="Third option">Option 3</option>
          </select>
          <div>
            <strong>Current Selected Option:</strong> {selectedOption}
          </div>
        </div>
      </Fig>
      <div className={'debounceInput'}>
        <h1>Non-Fig Debounced Search Example</h1>
        {/* <Debounce
          element="input"
          type="text"
          onChange={(event) => {setSearchTerm(event.target.value)}}
          value={searchTerm}
          minLength={3} // Specify the minimum length before triggering the search
          debounceTimeout={1000} // Specify the debounce timeout (in milliseconds)
        /> */}
        <Debounce
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
          minLength={3}
          debounceTimeout={100}
        >
          <div>
            {/* <textarea /> */}
            <input type='text' /> {/* <- input element wrapped with Debounce */}
          </div>
        </Debounce>
        <div>
          <strong>Current Search Term:</strong> {searchTerm}
        </div>
      </div>

      {/* <Fig config={throttleConfig}> */}
        <div className={'figthrottleInput'}>
          <h1>Fig Throttled Search Example</h1>
          <div>
            <input
              type='text'
              onChange={(event) => {
                setFigSearchTermThrottle(event.target.value);
              }}
            />{' '}
          </div>
          <div>
            <strong>Current Search Term:</strong> {figSearchTermThrottle}
          </div>
        </div>
      {/* </Fig> */}

      <div className={'throttleInput'}>
        <h1>Non-Fig Throttled Search Example</h1>
        {/* <Throttle
          element="input"
          type="text"
          onChange={(event) => {setSearchTermThrottle(event.target.value)}}
          value={searchTermThrottle}
          minLength={0} // Specify the minimum length before triggering the search
          throttleTimeout={500} // Specify the throttle timeout (in milliseconds)
        /> */}
        <Throttle
          onChange={(event) => {
            setSearchTermThrottle(event.target.value);
          }}
          minLength={0}
          throttleTimeout={500}
        >
          <div>
            <input type='text' /> {/* <- input element wrapped with Throttle */}
            {/* <textarea /> */}
          </div>
        </Throttle>
        <div>
          <strong>Current Search Term:</strong> {searchTermThrottle}
        </div>
      </div>
    </>
  );
};

export default ExampleComponent;
