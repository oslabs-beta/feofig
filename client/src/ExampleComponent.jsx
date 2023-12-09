import React, { useState } from 'react';
import Debounce from '../../dev/utils/debounce';
import Home from './Home';
import Throttle from '../../dev/utils/throttle';

const ExampleComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTermThrottle, setSearchTermThrottle] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  const [buttonClickCount, setButtonClickCount] = useState(0);

  const handleButtonClick = () => {
    setButtonClickCount((prevCount) => prevCount + 1);
  };

  return (
    <div>
      <h1>Debounced Search Example</h1>
      {/* <Debounce
        element="input"
        type="text"
        onChange={(event) => {setSearchTerm(event.target.value)}}
        value={searchTerm}
        minLength={3} // Specify the minimum length before triggering the search
        debounceTimeout={1000} // Specify the debounce timeout (in milliseconds)
      /> */}
      <Debounce
        onChange={(event) => { setSearchTerm(event.target.value);}}
        minLength={3}
        debounceTimeout={1000}
      >
        <div>
          {/* <textarea /> */}
          <input type='text' />
        </div>
      </Debounce>
      <div>
        <strong>Current Search Term:</strong> {searchTerm}
      </div>

    </div>

    // <div>
    //   <h1>Throttled Search Example</h1>
    //   <Throttle
    //     element="input"
    //     type="text"
    //     onChange={(event) => {setSearchTermThrottle(event.target.value)}}
    //     value={searchTermThrottle}
    //     minLength={0} // Specify the minimum length before triggering the search
    //     throttleTimeout={500} // Specify the throttle timeout (in milliseconds)
    //   />
    //   <div>
    //     <strong>Current Search Term:</strong> {searchTermThrottle}
    //   </div>
    // </div>

    // select element not properly working; now showing selectedOption next to "Current Selected Option" somehow
    // <div>
    //   <h1>Debounced Select Example</h1>
    //   <Debounce
    //     element="select"  // Change the element prop to 'select'
    //     onChange={(event) => setSelectedOption(event.target.value)}
    //     value={selectedOption}
    //     debounceTimeout={1000}
    //   >
    //     <option value="">Select an option</option>
    //     <option value="option1">Option 1</option>
    //     <option value="option2">Option 2</option>
    //     <option value="option3">Option 3</option>
    //   </Debounce>
    //   <p>Selected option will be logged to the console after a debounce delay.</p>
    //   <div>
    //     <strong>Current Selected Option:</strong> {selectedOption}
    //   </div>
    // </div>
  );
};

export default ExampleComponent;
