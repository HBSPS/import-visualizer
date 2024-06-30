import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Tree from 'react-d3-tree';
import Controller from './Controller.jsx';

const SEPERATION_INTERVAL = 0.5;
const DEPTH_INTERVAL = 50;

function App() {
  const [orientation, setOrientation] = useState('vertical');
  const [depthFactor, setDepthFactor] = useState(200);
  const [seperation, setSeperation] = useState(3);

  const changeOrientation = () => {
    if (orientation === 'vertical') setOrientation('horizontal');
    else setOrientation('vertical');
  };

  const increaseDepthFactor = () => {
    setDepthFactor((prev) => prev + DEPTH_INTERVAL);
  };

  const decreaseDepthFactor = () => {
    setDepthFactor((prev) => (prev - DEPTH_INTERVAL > 0 ? prev - DEPTH_INTERVAL : prev));
  };

  const increaseSeperation = () => {
    setSeperation((prev) => prev + SEPERATION_INTERVAL);
  };

  const decreaseSeperation = () => {
    setSeperation((prev) => (prev - SEPERATION_INTERVAL > 0 ? prev - SEPERATION_INTERVAL : prev));
  };

  return (
    <div style={{ width: '98vw', height: '98vh' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
        <div style={{ display: 'flex', gap: 5, alignItems: 'center', justifyContent: 'center' }}>
          <span>Orientation</span>
          <button type='button' onClick={changeOrientation}>
            {orientation}
          </button>
        </div>
        <Controller />
        <div style={{ display: 'flex', gap: 5, alignItems: 'center', justifyContent: 'center' }}>
          <span>Depth Factor</span>
          <button type='button' onClick={increaseDepthFactor}>
            up
          </button>
          <button type='button' onClick={decreaseDepthFactor}>
            down
          </button>
        </div>
        <div style={{ display: 'flex', gap: 5, alignItems: 'center', justifyContent: 'center' }}>
          <span>Seperation</span>
          <button type='button' onClick={increaseSeperation}>
            up
          </button>
          <button type='button' onClick={decreaseSeperation}>
            down
          </button>
        </div>
      </div>
      <Tree
        data={data}
        pathFunc='step'
        orientation={orientation}
        translate={{ x: 500, y: 250 }}
        separation={{ nonSiblings: seperation, siblings: seperation }}
        rootNodeClassName='node__root'
        branchNodeClassName='node__branch'
        leafNodeClassName='node__leaf'
        initialDepth={undefined}
        depthFactor={depthFactor}
      />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
