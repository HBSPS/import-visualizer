import React, { useState } from 'react';

export default function Controller() {
  const [titleSize, setTitleSize] = useState(20);
  const [attributeSize, setAttributeSize] = useState(15);

  return (
    <>
      <div style={{ display: 'flex', gap: 5, alignItems: 'center', justifyContent: 'center' }}>
        <span>Title Size</span>
        <button type='button' onClick={() => setTitleSize((prev) => prev + 1)}>
          up
        </button>
        <button type='button' onClick={() => setTitleSize((prev) => (prev - 1 > 0 ? prev - 1 : prev))}>
          down
        </button>
      </div>
      <div style={{ display: 'flex', gap: 5, alignItems: 'center', justifyContent: 'center' }}>
        <span>Attribute Size</span>
        <button type='button' onClick={() => setAttributeSize((prev) => prev + 1)}>
          up
        </button>
        <button type='button' onClick={() => setAttributeSize((prev) => (prev - 1 > 0 ? prev - 1 : prev))}>
          down
        </button>
      </div>
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
