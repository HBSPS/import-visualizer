import React from 'react';
import ReactDOM from 'react-dom';
import Tree from 'react-d3-tree';
import Controller from './Controller.jsx';

function App() {
  return (
    <div style={{ width: '98vw', height: '98vh' }}>
      <Controller />
      <Tree
        data={data}
        pathFunc='step'
        orientation='vertical'
        translate={{ x: 500, y: 250 }}
        separation={{ nonSiblings: 3, siblings: 3 }}
        rootNodeClassName='node__root'
        branchNodeClassName='node__branch'
        leafNodeClassName='node__leaf'
        initialDepth={undefined}
      />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
