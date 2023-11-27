import React from 'react';
import LazyLoad from './utils/LazyLoad';

const Fig = ({children, config}) => {
  const applyConfig = (child) => {
    if (config && config.lazyload) {
      return (
        <LazyLoad
          threshold={config.lazyload.threshold}
          once={config.lazyload.once}
        >
          {child}
        </LazyLoad>
      );
    }
    return child;
  };

  const modifiedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return applyConfig(child);
    }
    return child;
  });

  return <>{modifiedChildren}</>;
};

export default Fig;
