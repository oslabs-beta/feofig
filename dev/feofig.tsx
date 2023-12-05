import React from 'react';
import LazyLoad from './utils/lazyload';

type Element = React.ReactElement;

type Config = {
  lazyload?: LazyLoadConfig;
};

type LazyLoadConfig = {
  threshold?: number;
  once?: false;
};

type FigProps = {
  children: Element;
  config: Config;
  placeholder?: Element;
};

const Fig = ({children, config, placeholder}: FigProps) => {
  const isLazyLoadEnabled = config && config.lazyload;

  const wrapWithLazyLoad = (child: Element, index: number) => {
    if (!isLazyLoadEnabled || !React.isValidElement(child)) {
      return child;
    }

    const imageIsolator = (node: React.ReactNode): React.ReactNode => {
      if (!React.isValidElement(node)) return node; // Preserve non-element nodes

      // if node is an image, wrap it with LazyLoad
      if (node.type === 'img') {
        return (
          <LazyLoad
            key={index}
            threshold={config.lazyload?.threshold || 0}
            placeholder={placeholder}
          >
            {node}
          </LazyLoad>
        );
      }

      // if node has children, recursively transform them
      if (node.props && node.props.children) {
        const children = React.Children.toArray(node.props.children).map(
          imageIsolator
        );

        return React.cloneElement(node, {
          ...node.props,
          children: children,
        });
      }

      return node;
    };

    return imageIsolator(child) || child;
  };

  return (
    <>
      {React.Children.map(children, (child, index) =>
        wrapWithLazyLoad(child, index)
      )}
      {console.log(children)}
    </>
  );
};

export default Fig;
