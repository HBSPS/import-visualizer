import React from 'react';

export default function CustomNode({ nodeDatum, toggleNode }) {
  return (
    <>
      <circle r='15' onClick={toggleNode}></circle>
      <g class='rd3t-label'>
        <text class='rd3t-label__title' text-anchor='center' x='20' y='20'>
          {nodeDatum.name}
        </text>
        <text class='rd3t-label__attributes'>
          <tspan x='20' y='20' dy='1.2em'>
            dir: {nodeDatum.attributes.dir}
          </tspan>
        </text>
      </g>
    </>
  );
}
