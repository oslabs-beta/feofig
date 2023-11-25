import React, { useState, useEffect } from 'react';

const Widget = ({ id, count: propCount, once }) => {
  const [isReady, setIsReady] = useState(true);
  const [count, setCount] = useState(1);

  useEffect(() => {
    let timeoutId;

    // Equivalent to `componentWillReceiveProps`
    if (id) {
      setIsReady(false);
      // Set timeout to mimic the asynchronous setState
      timeoutId = setTimeout(() => {
        setIsReady(true);
        setCount(currentCount => currentCount + 1);
      }, 500);
    } else {
      setIsReady(true);
    }

    // Cleanup timeout when the component is unmounted or before re-running the effect
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [id]); // Only re-run the effect if `id` changes

  return isReady ? (
    <div className="widget">
      <span className="widget-counter">{propCount}</span>
      {once ? (
        <div className="widget-text once">
          <code>
            &lt;LazyLoad once&gt;<br />
            &nbsp;&nbsp;&lt;Widget /&gt;<br />
            &lt;/LazyLoad&gt;
          </code>
        </div>
      ) : (
        <div className="widget-text">
          <code>
            &lt;LazyLoad&gt;<br />
            &nbsp;&nbsp;&lt;Widget /&gt;<br />
            &lt;/LazyLoad&gt;
          </code>
        </div>
      )}
      <p>render times: {count}</p>
      <p>props from parent: {id}</p>
    </div>
  ) : (
    <div className="widget loading">
      loading...
    </div>
  );
};

export default Widget;