import React, {useState, useEffect} from 'react';

import { 
   getInitialGrid,
   addWallToGrid,
   generateNewGridFromPath
} from '../utils/grid';
import { getAStarData } from '../algorithms/astar'

export const VisualizerContext = React.createContext();


const calculateNumOfRows = (nodeWidth) => {
   const maxCols = 50;
   const totalAllowed = parseInt( (window.innerHeight - 200) / nodeWidth );
   const min = Math.min(maxCols, totalAllowed)
   return Math.min(maxCols, totalAllowed);
}

const calculateNumOfCols = (nodeWidth) => {
   const maxRows = 50;
   const totalAllowed = parseInt( (window.innerWidth - 32) / nodeWidth );
   return Math.min(maxRows, totalAllowed);
}

const calculateNodeWidth = () => {
   const min = Math.min(window.innerWidth, window.innerHeight - 200);
   return window.innerWidth <= 1050 ? 30 : 40;
}

const generateInitialConfig = () => {
   const nodeWidth = calculateNodeWidth();
   const numOfRows = calculateNumOfRows(nodeWidth);
   const numOfCols = calculateNumOfCols(nodeWidth);
   const row = Math.floor(numOfRows/2);
   const startCol = Math.floor(numOfCols * .25);
   const endCol = numOfCols - (startCol + 1);
   return {
      startNodeRow: row,
      startNodeCol: startCol,
      endNodeRow: row,
      endNodeCol: endCol,
      numOfRows,
      numOfCols,
      timeOut: 30,
      orderTimeOut: 10,
      nodeWidth
   }
}

const initialConfig = generateInitialConfig();

const VisualizerContextComponent = (props) => {
   const [config, setConfig] = useState( initialConfig );
   const [grid, setGrid] = useState( getInitialGrid(config) );
   const [mouseDownForStart, setMouseDownForStart] = useState(false);
   const [mouseDownForEnd, setMouseDownForEnd] = useState(false);
   const [mouseDownForWalls, setMouseDownForWalls] = useState(false);

   useEffect(()=>{
      window.addEventListener('mouseup', function(){
         let c = clearMouse();
      })
      window.updateConfig = function(config){
         setConfig(config)
      }
   },[])

   useEffect(()=>{
      clearGrid();
   },[config])


   
   const handleOnMouseDown = ( type, row, col ) => {
      switch(type){
         case 'start':
            setMouseDownForStart(true);
            clearGrid();
            break;
         case 'end':
            setMouseDownForEnd(true);
            clearGrid();
            break;
         case 'wall':
            setMouseDownForWalls(true);
            toggleWall(row, col);
            break;
         default:
            break;
      }
   }

   const clearMouse = () => {
      if(mouseDownForStart){ setMouseDownForStart(false) }
      if(mouseDownForEnd){ setMouseDownForEnd(false) }
      if(mouseDownForWalls){ setMouseDownForWalls(false); console.log('clear walls') }
      setMouseDownForWalls(false);
      return 'clearMouse'
   }

   const handleOnMouseUp = (row, col) => {
      if(mouseDownForStart){ updateStartNode(row,col);}
      if(mouseDownForEnd){ updateEndNode(row, col); }
      clearMouse();
   }

   const handleOnMouseEnter = (row, col) => {
      if(mouseDownForWalls){
         toggleWall(row, col);
      }
      
   }

   const clearGrid = () => {
      const newGrid = getInitialGrid(config);
      setGrid(newGrid);
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
      let canMakeWall = true;
      if( row === config.startNodeRow && col === config.startNodeCol ){ canMakeWall = false }
      if( row === config.endNodeRow && col === config.endNodeCol ){ canMakeWall = false }
      if(canMakeWall){
         const newGrid = addWallToGrid(grid, row, col)
         setGrid(newGrid)
      }
   }

   const runAStar = () => {
      const startNode = grid[config.startNodeRow][config.startNodeCol];
      const endNode = grid[config.endNodeRow][config.endNodeCol];
      const {path, orderVisited} = getAStarData(grid, startNode, endNode);
      
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
      <VisualizerContext.Provider value={ 
         {grid, config, toggleWall, runAStar, updateStartNode, updateEndNode, handleOnMouseDown, handleOnMouseUp, handleOnMouseEnter} 
      }>
         {props.children}
      </VisualizerContext.Provider>
   )
}

export default VisualizerContextComponent;