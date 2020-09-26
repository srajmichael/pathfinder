import React, {useState, useEffect} from 'react';

import { 
   getInitialGrid,
   addWallToGrid,
   generateNewGridFromPath,
   generateGridWithWalls
} from '../utils/grid';
import { getAStarData } from '../algorithms/astar'

export const VisualizerContext = React.createContext();


const calculateNumOfRows = (nodeWidth) => {
   const maxCols = 50;
   const totalAllowed = parseInt( (window.innerHeight - 200) / nodeWidth );
   return Math.min(maxCols, totalAllowed);
}

const calculateNumOfCols = (nodeWidth) => {
   const maxRows = 50;
   const totalAllowed = parseInt( (window.innerWidth - 32) / nodeWidth );
   return Math.min(maxRows, totalAllowed);
}

const calculateNodeWidth = () => {
   return window.innerWidth <= 1050 ? 24 : 30;
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


class VisualizerContextComponent extends React.Component{
   constructor(props){
      super(props);
      this.state = {
         config: initialConfig,
         grid: getInitialGrid(initialConfig),
         mouseDownForStart: false,
         mouseDownForEnd: false,
         mouseDownForWalls: false,
         ranAStar: false
      }
   }

   componentDidMount(){
      const self = this;
      window.addEventListener('mouseup', function(){
         let c = self.clearMouse(); 
      })
      window.updateConfig = function(config){
         self.setConfig(config)
      }
      window.clearGrid = function(){
         self.clearGrid();
      }
      window.getConfig = function(){
         console.log(self.state.config)
      }
   }

   handleOnMouseDown = ( type, row, col, isWall, grid ) => {
      switch(type){
         case 'start':
            this.setState({
               mouseDownForStart: true,
                  grid: generateGridWithWalls(this.state.config, grid)
               })
            // this.setState({mouseDownForStart: true, grid: getInitialGrid(this.state.config)})
            break;
         case 'end':
            this.setState({
               mouseDownForEnd: true, 
               grid: generateGridWithWalls(this.state.config, grid)
            })
            // this.setState({mouseDownForEnd: true, grid: getInitialGrid(this.state.config)})
            break;
         case 'wall':
            this.setState((prevState)=>{
               const newState = {
                  mouseDownForWalls: true, 
                  grid: prevState.grid
               };
               if(prevState.ranAStar){
                  // newState.grid = getInitialGrid(prevState.config);
                  newState.grid =generateGridWithWalls(prevState.config, grid);
                  newState.ranAStar = false;
               }
               newState.grid[row][col].isWall = !isWall;
               return newState;
            })
            break;
         default:
            break;
      }
      
   }

   clearMouse = () => {
      this.setState({
         mouseDownForStart: false,
         mouseDownForEnd: false,
         mouseDownForWalls: false
      });
   }

   handleOnMouseUp = (row, col, grid) => {
      if(!this.state.mouseDownDuringRunning){
         if(this.state.mouseDownForStart){ this.updateStartNode(row,col,grid);}
         if(this.state.mouseDownForEnd){ this.updateEndNode(row, col, grid); }
         this.clearMouse();
      }

   }

   handleOnMouseEnter = (row, col) => {
      if(!this.state.mouseDownDuringRunning){
         if(this.state.mouseDownForWalls){
            this.toggleWall(row, col);
         }
      }
   }


   clearOnlyVisited = (state) => {
      const newGrid = getInitialGrid(state.config);

      for(let row = 0; row < newGrid.length; row++){
         for(let col = 0; col < newGrid[row].length; col++){
            newGrid[row][col].isWall = state.grid[row][col].isWall;
         }
      }

      return newGrid;
   }


   clearGrid = () => {
      const newGrid = getInitialGrid(this.state.config);
      this.setState({grid: newGrid, ranAStar: false})
   }

   updateStartNode = (row, col, currentGrid) => {
      if(!this.state.grid[row][col].isWall){
         this.setState((prevState)=>{
            const newConf = {...prevState.config};
            newConf.startNodeRow = row;
            newConf.startNodeCol = col;
            // const newGrid = getInitialGrid(newState);
            const newGrid = generateGridWithWalls(newConf, currentGrid)
   
            return {config: newConf, grid: newGrid, ranAStar: false}
         })
      }

   }

   updateEndNode = (row, col, currentGrid) => {
      if(!this.state.grid[row][col].isWall){
         this.setState((prevState)=>{
            const newConf = {...prevState.config};
            newConf.endNodeRow = row;
            newConf.endNodeCol = col;
            // const newGrid = getInitialGrid(newConf);
            const newGrid = generateGridWithWalls(newConf, currentGrid)
            return {config: newConf, grid: newGrid, ranAStar: false}
         })
      }
   }



   toggleWall = (row, col) => {
      let canMakeWall = true;
      if( row === this.state.config.startNodeRow && col === this.state.config.startNodeCol ){ canMakeWall = false }
      if( row === this.state.config.endNodeRow && col === this.state.config.endNodeCol ){ canMakeWall = false }
      if(canMakeWall){
         
         const newGrid = addWallToGrid(this.state.grid, row, col);
         this.setState({grid: newGrid})
      }
   }


   runAStar = () => {
      const startNode = this.state.grid[this.state.config.startNodeRow][this.state.config.startNodeCol];
      const endNode = this.state.grid[this.state.config.endNodeRow][this.state.config.endNodeCol];
      const {path, orderVisited} = getAStarData(this.state.grid, startNode, endNode);
      
      for(let i = 0; i < path.length; i++){
         const n = path[i];
         n.pathIndex = i;
      }

      for(let i = 0; i < orderVisited.length; i++){
         const n = orderVisited[i];
         n.orderVisited = i;
         n.numOfNodesVisited = orderVisited.length;
      }

      const newGrid = generateNewGridFromPath(this.state.grid, path);
      this.setState({grid: newGrid, ranAStar: true});
   }

   render(){
      return(
         <VisualizerContext.Provider value={ 
            {
               grid: this.state.grid, 
               config: this.state.config, 
               toggleWall: this.toggleWall, 
               runAStar: this.runAStar, 
               updateStartNode: this.updateStartNode, 
               updateEndNode: this.updateEndNode, 
               handleOnMouseDown: this.handleOnMouseDown, 
               handleOnMouseUp: this.handleOnMouseUp, 
               handleOnMouseEnter: this.handleOnMouseEnter,
               clearGrid: this.clearGrid
            } 
         }>
            {this.props.children}
         </VisualizerContext.Provider>
      )
   }
}


export default VisualizerContextComponent;