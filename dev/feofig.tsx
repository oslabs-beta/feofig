import React from 'react';
import LazyLoad from './utils/lazyload';
import validateConfigs from './types/validateConfig';
import {FigProps} from './types/types';

const Fig = ({children, config, placeholder}: FigProps) => {
  // tests to see if user inputs for config are valid, throws error if not
  validateConfigs(config);

  // might get rid of these since it doesn't type guard well
  const isLazyLoadEnabled = config && config.lazyload;
  const isDebounceEnabled = config && config.debounce;
  const isThrottleEnabled = config && config.throttle;
  const isTestingEnabled = config && config.test;

  // recursively iterates through elements to find desired type to wrap
  const elementIsolator = (node: React.ReactNode): React.ReactNode => {
    // check if the node is a Fig component, if so then ignore Fig
    if (React.isValidElement(node) && node.type === Fig) {
      return node;
    }

    // preserves non-element nodes like strings
    if (!React.isValidElement(node)) return node;

    // if node is an image, wrap it with LazyLoad
    if (isLazyLoadEnabled) {
      if (node.type === 'img') {
        return (
          <LazyLoad
            key={crypto.randomUUID()}
            threshold={config.lazyload?.threshold || 0} // default: 0
            placeholder={placeholder}
            once={config.lazyload?.once !== false} // default: false
            offset={config.lazyload?.offset || '0px'} // default: '0px'
          >
            {node}
          </LazyLoad>
        );
      }
    }

    // DEBOUNCE AND THROTTLING LOGIC HERE
    if (isDebounceEnabled || isThrottleEnabled) {
      // if an array of classes is provided for the target,
      if (typeof config.debounce?.target || typeof config.throttle?.target) {
        // add debounce/throttle to specified classes in the target and return
      } else if (node.type === 'btn') {
        // default if array is not provided
        // add debounceing/throttling depending on which is enabled and return
      } // maybe account for other handlers besides button
    }

    // can filter for more node types and apply other wrappers below:

    // if node has children, recursively transform them to fit react props children array format
    if (node.props && (node as React.ReactElement).props.children) {
      const children = React.Children.toArray(
        (node as React.ReactElement).props.children
      ).map(elementIsolator);

      return React.cloneElement(node as React.ReactElement, {
        ...node.props,
        children: children,
      });
    }

    return node;
  };

  // calls recursive function to apply FEO wrappers to each child
  const wrapper = (child: React.ReactElement, index: number) => {
    if (!React.isValidElement(child)) {
      return child;
    }

    // calls recursive function, add more checks here if necessary
    if (isLazyLoadEnabled || isDebounceEnabled || isThrottleEnabled) {
      return elementIsolator(child) || child;
    }
  };

  return (
    <>
      {React.Children.map(children, (child, index) => {
        return wrapper(child, index);
      })}
    </>
  );
};

export default Fig;
