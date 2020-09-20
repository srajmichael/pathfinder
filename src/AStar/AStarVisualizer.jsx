import React, {useState} from 'react';

import Node from './Node/Node';
import {getDistanceFromNode, astar, getAStarData} from '../algorithms/astar';
import {
   getInitialGrid,
   generateNewGridFromPath,
   addWallToGrid,
   START_NODE_ROW,
   START_NODE_COL,
   FINISH_NODE_ROW,
   FINISH_NODE_COL
} from '../utils/grid';
import './AStarVisualizer.css'

const AStarVisualizer = () => {
   const [grid, setGrid] = useState( getInitialGrid() );
   const [startNode, setStartNode] = useState( grid[START_NODE_ROW][START_NODE_COL] );
   const [endNode, setEndNode] = useState( grid[FINISH_NODE_ROW][FINISH_NODE_COL] );

   const runAStar = (grid, startNode, endNode) => {
      // const path = astar(grid, startNode, endNode);

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

   const toggleWall = (row, col) => {
      const newGrid = addWallToGrid(grid, row, col)
      setGrid(newGrid)
   }
   
   return(
      <div>
         <button onClick={()=>{runAStar(grid, startNode, endNode)}}>Log It</button>
         <div className='grid'>
            {
               grid.map( (row, rowIndex) => {
                  return (
                     <div className='row'>
                        {
                           row.map( (col, colIndex) => {
                              const n = grid[rowIndex][colIndex];
                              return (
                                 <Node 
                                    row={rowIndex}
                                    col={colIndex}
                                    isWall={n.isWall}
                                    pathIndex={n.pathIndex}
                                    timeOut={n.timeOut}
                                    isStart={n.isStart}
                                    isEnd={n.isEnd}
                                    toggleWall={toggleWall}
                                    orderVisited={n.orderVisited}
                                    orderTimeOut={n.orderTimeOut}
                                    numOfNodesVisited={n.numOfNodesVisited}
                                 />
                              )
                           })
                        }
                     </div>
                  )
               } )
            }
         </div>
      </div>

   )
}


export default AStarVisualizer;