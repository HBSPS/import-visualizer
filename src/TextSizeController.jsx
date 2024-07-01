import React, { useState } from 'react';
import Controller from './Controller.jsx';

const TITLE_SIZE_INTERVAL = 1;
const ATTRIBUTE_SIZE_INTERVAL = 1;

export default function TextSizeController() {
  const [titleSize, setTitleSize] = useState(20);
  const [attributeSize, setAttributeSize] = useState(15);

  const increaseTitleSize = () => {
    setTitleSize((prev) => prev + TITLE_SIZE_INTERVAL);
  };

  const decreaseTitleSize = () => {
    setTitleSize((prev) => (prev - TITLE_SIZE_INTERVAL > 0 ? prev - TITLE_SIZE_INTERVAL : prev));
  };

  const increaseAttributeSize = () => {
    setAttributeSize((prev) => prev + ATTRIBUTE_SIZE_INTERVAL);
  };

  const decreaseAttributeSize = () => {
    setAttributeSize((prev) => (prev - ATTRIBUTE_SIZE_INTERVAL > 0 ? prev - ATTRIBUTE_SIZE_INTERVAL : prev));
  };

  return (
    <>
      <Controller title='Title Size' onClickIncrease={increaseTitleSize} onClickDecrease={decreaseTitleSize} />
      <Controller
        title='Attribute Size'
        onClickIncrease={increaseAttributeSize}
        onClickDecrease={decreaseAttributeSize}
      />
      <style jsx>
        {`
          .node__root > g > .rd3t-label__title {
            font-size: ${titleSize}px;
          }

          .node__branch > g > .rd3t-label__title {
            font-size: ${titleSize}px;
          }

          .node__leaf > g > .rd3t-label__title {
            font-size: ${titleSize}px;
          }

          .node__root > g > .rd3t-label__attributes {
            font-size: ${attributeSize}px;
          }

          .node__branch > g > .rd3t-label__attributes {
            font-size: ${attributeSize}px;
          }

          .node__leaf > g > .rd3t-label__attributes {
            font-size: ${attributeSize}px;
          }
        `}
      </style>
    </>
  );
}
