import React, { useEffect, useMemo, useState } from 'react';
import LazyLoad from './utils/lazyload';
import Debounce from './utils/debounce';
import Throttle from './utils/throttle';
import validateConfigs from './types/validateConfig';
import PauseAnimation from './utils/pauseAnimation';
import { FigProps } from './types/types';

const Fig = ({ children, config, placeholder }: FigProps) => {
  const [transformedChildren, setTransformedChildren] =
    useState<React.ReactElement | null>(null);
  const [finishedTransforming, setFinishedTransforming] =
    useState<Boolean>(false);

  useEffect(() => {
    // tests to see if user inputs for config are valid, throws error if not

    if (config.validate === undefined || config.validate === true)
      validateConfigs(config);
  }, [config]);

  const isLazyLoadEnabled = config && config.lazyload;
  const isDebounceEnabled = config && config.debounce;
  const isThrottleEnabled = config && config.throttle;
  const isPauseAnimationEnabled = config && config.pauseAnimation;

  // Memoize the elementIsolator function to prevent unnecessary recalculations
  const memoizedElementIsolator = useMemo(() => {
    // Recursively iterates through elements to find desired type to wrap
    // May affect performance when recursing on every rerender for deeply nested code.
    const elementIsolator = (node: React.ReactNode): React.ReactNode => {
      // check if the node is a Fig component, if so then ignore Fig
      if (React.isValidElement(node) && node.type === Fig) {
        return node;
      }

      // preserves non-element nodes like strings
      if (!React.isValidElement(node)) return node;

      if (isPauseAnimationEnabled) {
        // in the Config, developer will designate which css classes to disable by adding css class names to the "classes" property on 'pauseAnimation'
        // conditional is checking if any of the designated classes are applied to the node
        if (
          config.pauseAnimation?.classes.includes(
            (node as React.ReactElement).props.className
          )
        ) {
          return (
            <>
              <PauseAnimation
                threshold={config.pauseAnimation?.threshold}
                offset={config.pauseAnimation?.offset}
              >
                {node}
              </PauseAnimation>
            </>
          );
        }
      }

      // if node is an image, wrap it with LazyLoad
      if (isLazyLoadEnabled) {
        if (node.type === 'img') {
          return (
            <LazyLoad
              key={(Math.random() * Math.random() * 99999).toString()}
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

      // still need to filter by config.target
      if (isDebounceEnabled) {
        if (Array.isArray(config.debounce?.target)) {
        } else if (
          (node as React.ReactElement).type === 'input' ||
          (node as React.ReactElement).type === 'textarea' ||
          (node as React.ReactElement).type === 'select'
        ) {
          return (
            <>
              <Debounce
                onChange={(node as React.ReactElement).props.onChange}
                minLength={config.debounce?.minLength || 0}
                // there is an unsolved bug when timeout is set to 100, so adding 1 ms if user sets it to 100. If set to 100, will throw an error related to the 'notify' ref in debounce.tsx
                debounceTimeout={
                  config.debounce?.delay === undefined ||
                  config.debounce?.delay === 100
                    ? 101
                    : config.debounce?.delay
                }
              >
                {node}
              </Debounce>
            </>
          );
        } else if ((node as React.ReactElement).type === 'form') {
          return (
            <form {...(node as React.ReactElement).props}>
              {React.Children.map(
                (node as React.ReactElement).props.children,
                (child: React.ReactElement) =>
                  memoizedElementIsolator(child) || child
              )}
            </form>
          );
        }
      }

      if (isThrottleEnabled) {
        if (Array.isArray(config.throttle?.target)) {
        } else if ((node as React.ReactElement).type === 'input') {
          return (
            <>
              <Throttle
                onChange={(node as React.ReactElement).props.onChange}
                minLength={config.throttle?.minLength || 0}
                throttleTimeout={
                  config.throttle?.delay === undefined
                    ? 100
                    : config.throttle?.delay
                }
              >
                {node}
              </Throttle>
            </>
          );
        }
      }

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
    return elementIsolator;
  }, [config]); // Add dependencies that affect the transformation

  // calls recursive function to apply FEO wrappers to each child
  const wrapper = (child: React.ReactElement, index: number) => {
    if (!React.isValidElement(child)) {
      return child;
    }

    // calls recursive function, add more checks here if necessary
    if (
      isLazyLoadEnabled ||
      isDebounceEnabled ||
      isThrottleEnabled ||
      isPauseAnimationEnabled
    ) {
      return memoizedElementIsolator(child) || child;
    }
  };

  // Memoize the transformed children
  const memoizedChildren = useMemo(() => {
    return React.Children.map(children, wrapper);
  }, [children, memoizedElementIsolator]);

  return <>{memoizedChildren}</>;
};

export default Fig;
