import React, {useState, useContext} from 'react';

import Node from './Node/Node';
import {VisualizerContext} from './VisualizerContext';
import './AStarVisualizer.css'

const AStarVisualizer = () => {

   const {
      grid, toggleWall, runAStar, config
   } = useContext(VisualizerContext);


   const gridStyles = {
      width: `${config.numOfCols * config.nodeWidth}px`
   }

   return(
      <div>
         <button onClick={runAStar}>Log It</button>
         <div className='grid' style={gridStyles}>
            {
               grid.map( (row, rowIndex) => {
                  return (
                     <div className='row'>
                        {
                           row.map( (col, colIndex) => {
                              const n = grid[rowIndex][colIndex];
                              const keyOrder = n.orderVisited ? n.orderVisited : '';
                              const keyPath = n.pathIndex ? n.pathIndex : '';
                              const keyWall = n.isWall ? 'wall' : '';
                              const nKey = `r${rowIndex}c${colIndex}`;

                              return (
                                 <Node 
                                    key={nKey}
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
                                    nodeWidth={config.nodeWidth}
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