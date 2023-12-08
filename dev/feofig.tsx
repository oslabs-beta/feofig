import React, {useRef} from 'react';
import LazyLoad from './utils/lazyload';

type Element = React.ReactElement;

type Config = {
  lazyload?: LazyLoadConfig;
};

type LazyLoadConfig = {
  threshold?: number;
  once?: boolean;
};

type FigProps = {
  children: Element;
  config: Config;
  placeholder?: Element;
};

const Fig = ({children, config, placeholder}: FigProps) => {
  const isLazyLoadEnabled = config && config.lazyload;

  const elementIsolator = (node: React.ReactNode): React.ReactNode => {
    // preserves non-element nodes like strings
    if (!React.isValidElement(node)) return node;

    // if node is an image, wrap it with LazyLoad
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
          once={config.lazyload?.once === undefined ? true : false}
        >
          {node}
        </LazyLoad>
      );
    }

    // can filter for more node types and apply other wrappers here

    // if node has children, recursively transform them to fit react props children array format
    if (node.props && node.props.children) {
      const children = React.Children.toArray(node.props.children).map(
        elementIsolator
      );

      return React.cloneElement(node, {
        ...node.props,
        children: children,
      });
    }

    return node;
  };

  const wrapper = (child: Element, index: number) => {
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
      {React.Children.map(children, (child, index) =>
        wrapper(child, index)
      )}
    </>
  );
};

export default Fig;
