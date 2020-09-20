import React, {useState} from 'react';

import { 
   getInitialGrid,
   addWallToGrid,
   generateNewGridFromPath
} from '../utils/grid';
import { getAStarData } from '../algorithms/astar'

export const VisualizerContext = React.createContext();

const initialConfig = {
   startNodeRow: 5,
   startNodeCol: 10,
   endNodeRow: 20,
   endNodeCol: 20
}

const VisualizerContextComponent = (props) => {
   const [config, setConfig] = useState( initialConfig );
   const [grid, setGrid] = useState( getInitialGrid(config) );
   

   const clearGrid = () => {
      const newGrid = getInitialGrid(config);
      setConfig(newGrid);
   }

   const updateStartNode = (row, col) => {
      clearGrid();
      const newConfig = {...config};
      newConfig.startNodeRow = row;
      newConfig.startNodeCol = col;
      setConfig(newConfig);
   }

   const updateEndNode = (row, col) => {
      clearGrid();
      const newConfig = {...config};
      newConfig.endNodeRow = row;
      newConfig.endNodeCol = col;
      setConfig(newConfig);
   } 

   const toggleWall = (row, col) => {
      const newGrid = addWallToGrid(grid, row, col)
      setGrid(newGrid)
   }

   const runAStar = () => {
      const startNode = grid[config.startNodeRow][config.startNodeCol];
      const endNode = grid[config.endNodeRow][config.endNodeRow];

      const {path, orderVisited} = getAStarData(grid, startNode, endNode);
      console.log(orderVisited)

      for(let i = 0; i < path.length; i++){
         const n = path[i];
         n.pathIndex = i;
      }

      for(let i = 0; i < orderVisited.length; i++){
         const n = orderVisited[i];
         n.orderVisited = i;
         n.numOfNodesVisited = orderVisited.length;
      }

      const newGrid = generateNewGridFromPath(grid, path);
      setGrid(newGrid)
   }


   return (
      <VisualizerContext.Provider value={ {grid, config, toggleWall, runAStar, updateStartNode, updateEndNode} }>
         {props.children}
      </VisualizerContext.Provider>
   )
}

export default VisualizerContextComponent;