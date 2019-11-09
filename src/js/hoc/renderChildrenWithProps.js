import React, { cloneElement } from 'react';

const renderChildrenWithProps = (components, props) => (
  <>
    {components.map((component, key) =>
      cloneElement(component, {
        ...props,
        key,
      })
    )}
  </>
);

export default renderChildrenWithProps;
