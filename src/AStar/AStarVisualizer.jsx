import React, {useState} from 'react';

import Node from './Node/Node';
import {getDistanceFromNode, astar} from '../algorithms/astar';
import './AStarVisualizer.css'

const NUM_OF_ROWS = 20;
const NUM_OF_COLS = 20;
const START_NODE_ROW = 7;
const START_NODE_COL = 5;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 12;
const WALL_ROW = 10;
const WALL_COL = 5;


const getInitialGrid = () => {
   const grid = [];
   for(let row = 0; row < NUM_OF_ROWS; row++){
      const currentRow = [];
      for(let col = 0; col < NUM_OF_COLS; col++){
         const node = createNode(row,col);
         currentRow.push(node)
      }
      grid.push(currentRow)
   }
   return grid;
}

const createNode = (row,col) => {
   return {
      row,
      col,
      isWall: ( row === 10 && col === 5 ) || ( row === 9 && col === 6 ) || ( row === 8 && col === 6 ) || ( row === 7 && col === 6 ) || ( row === 6 && col === 6 ) || ( row === 5 && col === 5 ),
      visited: false,
      parent: null,
      gCost: Infinity,
      hCost: getDistanceFromNode({row,col}, {row: FINISH_NODE_ROW, col: FINISH_NODE_COL}),
      f: Infinity,
      pathIndex: null,
      timeOut: 200,
      isStart: (row === START_NODE_ROW && col === START_NODE_COL),
      isEnd: (row ===FINISH_NODE_ROW && col === FINISH_NODE_COL)
   }
}

//7,5 6,5 8,5 9,5 8,5 9,5
// const trueGrid = getInitialGrid();
// const trueStart = trueGrid[START_NODE_ROW][START_NODE_COL];
// const trueEnd = trueGrid[FINISH_NODE_ROW][FINISH_NODE_COL];
// window.addEventListener('click', function(){
//    astar(trueGrid, trueStart, trueEnd)
// })

const generateNewGrid = (grid, path) => {
   const newGrid = [];

   for(let row = 0; row < grid.length; row++){
      const currentRow = [];
      for(let col = 0; col < grid[row].length; col++){
         const node = grid[row][col];
         currentRow.push(node)
      }
      newGrid.push(currentRow)
   }

   for(let i = 0; i < path.length; i++){
      const node = newGrid[path[i].row][path[i].col];
      node.pathIndex = i
   }
   return newGrid
} 

const addWallToGrid = (grid, row, col) => {
   const newGrid = [];

   for(let row = 0; row < grid.length; row++){
      const currentRow = [];
      for(let col = 0; col < grid[row].length; col++){
         const node = grid[row][col];
         currentRow.push(node)
      }
      newGrid.push(currentRow)
   }
   newGrid[row][col].isWall = !newGrid[row][col].isWall;
   return newGrid;
}

const AStarVisualizer = () => {
   const [grid, setGrid] = useState( getInitialGrid() );
   const [startNode, setStartNode] = useState( grid[START_NODE_ROW][START_NODE_COL] );
   const [endNode, setEndNode] = useState( grid[FINISH_NODE_ROW][FINISH_NODE_COL] );

   const runAStar = (grid, startNode, endNode) => {
      const path = astar(grid, startNode, endNode);
      for(let i = 0; i < path.length; i++){
         const n = path[i];
         n.pathIndex = i;
      }
      const newGrid = generateNewGrid(grid, path);
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