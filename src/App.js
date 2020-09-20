import React from 'react';
import logo from './logo.svg';
import './App.css';

import VisualizerContextComponent from './AStar/VisualizerContext.jsx'
import AStarVisualizer from './AStar/AStarVisualizer';

function App() {
  return (
    <div className="App">
      <VisualizerContextComponent>
        <AStarVisualizer/>
      </VisualizerContextComponent>
      
    </div>
  );
}

export default App;
