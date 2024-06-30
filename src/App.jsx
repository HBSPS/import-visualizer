import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Tree from 'react-d3-tree';
import Controller from './Controller.jsx';

function App() {
  const [orientation, setOrientation] = useState('vertical');
  const [depthFactor, setDepthFactor] = useState(200);

  const changeOrientation = () => {
    if (orientation === 'vertical') setOrientation('horizontal');
    else setOrientation('vertical');
  };

  const changeDepthFactor = (e) => {
    setDepthFactor(e.target.value);
  };

  return (
    <div style={{ width: '98vw', height: '98vh' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
        <Controller />
        <div style={{ display: 'flex', gap: 5, alignItems: 'center', justifyContent: 'center' }}>
          <span>Orientation</span>
          <button type='button' onClick={changeOrientation}>
            {orientation}
          </button>
        </div>
        <div style={{ display: 'flex', gap: 5, alignItems: 'center', justifyContent: 'center' }}>
          <span>Depth Factor</span>
          <input type='number' onChange={changeDepthFactor} value={depthFactor} />
        </div>
      </div>
      <Tree
        data={data}
        pathFunc='step'
        orientation={orientation}
        translate={{ x: 500, y: 250 }}
        separation={{ nonSiblings: 3, siblings: 3 }}
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
