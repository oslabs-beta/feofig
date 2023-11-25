import React from 'react';

const Fig = ({ children, config }) => {
  
  // Function to apply styles based on config
  const applyStyles = (child) => {
    let newStyle = {};

    if (config.bold) {
      newStyle.fontWeight = 'bold';
    }
    if (config.italicize) {
      newStyle.fontStyle = 'italic';
    }

    // Merge with existing styles if any
    newStyle = { ...child.props.style, ...newStyle };

    return React.cloneElement(child, { style: newStyle });
  };

  // Apply styles to each child
  const modifiedChildren = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return applyStyles(child);
    }
    return child;
  });

  console.log(children)

  return <>{modifiedChildren}</>;
};

export default Fig;