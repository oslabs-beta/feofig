import React, {useRef} from 'react';
import LazyLoad from './utils/lazyload';

type Config = {
  lazyload?: LazyLoadConfig;
  throttle?: ThrottleConfig; // not added
  debounce?: DebounceConfig;
  test?: boolean; // tentative and not added
};

type LazyLoadConfig = {
  threshold?: number;
  once?: boolean;
};

type ThrottleConfig = {
  delay: number;
  target?: string[];
};

type DebounceConfig = {
  delay: number;
  target?: string[];
};

type FigProps = {
  children: React.ReactElement;
  config: Config;
  placeholder?: React.ReactElement;
};

const Fig = ({children, config, placeholder}: FigProps) => {
  const isLazyLoadEnabled = config && config.lazyload;
  const isDebounceEnabled = config && config.debounce;
  const isThrottleEnabled = config && config.throttle;
  const isTestingEnabled = config && config.test;

  console.log(children);

  const elementIsolator = (node: React.ReactNode): React.ReactNode => {

    // check if the node is a Fig component
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
            threshold={
              config.lazyload?.threshold === undefined
                ? 0
                : config.lazyload?.threshold
            }
            placeholder={placeholder}
            once={
              config.lazyload?.once || config.lazyload?.once === undefined
                ? true
                : false
            }
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
      const children = React.Children.toArray((node as React.ReactElement).props.children).map(
        elementIsolator
      );

      return React.cloneElement((node as React.ReactElement), {
        ...node.props,
        children: children,
      });
    }

    return node;
  };

  const wrapper = (child: React.ReactElement, index: number) => {
    if (!isLazyLoadEnabled || !React.isValidElement(child)) {
      return child;
    }

    // calls recursive function
    if (isLazyLoadEnabled) {
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
