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

  // need to find a way to store the parent and only wrap the lazy loading around the image part while returning the entire parent

  // recursively iterates through react elements to isolate images
  const imageIsolator = (children: React.ReactNode) : React.ReactElement | false => {

    console.log((children as React.ReactElement).type)
    
    // base cases:
    // if arg is a single element or text return false
    if (!React.isValidElement(children)) return false;
    // if arg does not have more children, return false
    if (typeof children.props.children !== 'object') return false;
    // if arg's type is image, return image element
    if ((children as React.ReactElement).type === 'img') {
      console.log('image found!')
      return children
    };

    // recursive case:
    // if arg has children, call function again passing in each child
    for (let child of children.props.children) imageIsolator(child);

    // returns false if no images are found
    return false;
  };

  const wrapWithLazyLoad = (child: Element, index: number): Element => {
    if (isLazyLoadEnabled && React.isValidElement(child)) {
      if (child.type !== 'img' && child.props) {
        const imgResult = imageIsolator(child);
        if (!imgResult) return child; 
        else {
          console.log()
          return (
            <LazyLoad
            key={index}
            threshold={config.lazyload?.threshold || 0}
            placeholder={placeholder}
          >
            {imgResult}
          </LazyLoad>
          )
        }
      }
      return (
        <LazyLoad
          key={index}
          threshold={config.lazyload?.threshold || 0}
          placeholder={placeholder}
        >
          {child}
        </LazyLoad>
      );
    }
    return child;
  };

  return React.Children.map(children, (child: Element, index: number) =>
    wrapWithLazyLoad(child, index)
  );
};

export default Fig;
