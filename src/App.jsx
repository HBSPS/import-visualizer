import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Tree from 'react-d3-tree';
import TextSizeController from './TextSizeController.jsx';
import Controller from './Controller.jsx';
import CustomNode from './CustomNode.jsx';

const SEPERATION_INTERVAL = 0.5;
const DEPTH_INTERVAL = 50;

function App() {
  const [orientation, setOrientation] = useState('horizontal');
  const [depthFactor, setDepthFactor] = useState(500);
  const [seperation, setSeperation] = useState(0.5);

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

  useEffect(() => {
    if (orientation === 'horizontal') {
      setDepthFactor(500);
      setSeperation(0.5);
    } else {
      setDepthFactor(100);
      setSeperation(2);
    }
  }, [orientation]);

  return (
    <div style={{ width: '98vw', height: '95vh' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
        <div style={{ display: 'flex', gap: 5, alignItems: 'center', justifyContent: 'center' }}>
          <span>Orientation</span>
          <button type='button' onClick={changeOrientation}>
            {orientation}
          </button>
        </div>
        <TextSizeController />
        <Controller title='Depth Factor' onClickIncrease={increaseDepthFactor} onClickDecrease={decreaseDepthFactor} />
        <Controller title='Seperation' onClickIncrease={increaseSeperation} onClickDecrease={decreaseSeperation} />
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
        initialDepth={collapse ? 1 : undefined}
        depthFactor={depthFactor}
        renderCustomNodeElement={(rd3Props) => CustomNode({ ...rd3Props })}
      />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
