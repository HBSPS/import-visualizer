import React from 'react';
import ReactDOM from 'react-dom';
import Tree from 'react-d3-tree';

function App() {
  return (
    <div style={{ width: '98vw', height: '98vh' }}>
      <Tree data={data} pathFunc='step' orientation='vertical' translate={{ x: 800, y: 400 }} />
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);