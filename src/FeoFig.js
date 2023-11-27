import React from 'react';

{/* < feo config = config1>
  <children></children>
</feo> */}

const Fig = ({children, config}) => {

  // helper function to apply config
  const applyConfig = (child) => {
    const props = {}
    // insert logic here
    if (config.lazyload.threshold) {
      // apply props
    };
    if (config.lazyload.once) {};
    

    return React.cloneElement(props);
  };

  // Apply styles to each child
  const modifiedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      // put helper function in here
    }
    return child;
  });

  console.log(children);

  return <>{modifiedChildren}</>;
};

export default Fig;
