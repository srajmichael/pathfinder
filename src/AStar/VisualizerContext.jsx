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


class VisualizerContextComponent extends React.Component{
   constructor(props){
      super(props);
      this.state = {
         config: initialConfig,
         grid: getInitialGrid(initialConfig),
         mouseDownForStart: false,
         mouseDownForEnd: false,
         mouseDownForWalls: false,
         ranAStar: false,
         wiggle: false,

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

   handleOnMouseDown = ( type, row, col, isWall ) => {
      switch(type){
         case 'start':
            this.setState({mouseDownForStart: true, grid: getInitialGrid(this.state.config)})
            break;
         case 'end':
            this.setState({mouseDownForEnd: true, grid: getInitialGrid(this.state.config)})
            break;
         case 'wall':
            this.setState((prevState)=>{
               console.log(isWall)
               const newState = {mouseDownForWalls: true, grid: prevState.grid};
               if(prevState.ranAStar){
                  newState.grid = getInitialGrid(prevState.config);
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
      })
      // if(this.state.mouseDownForStart){ this.setState({mouseDownForStart: false}) }
      // if(this.state.mouseDownForEnd){ this.setState({mouseDownForEnd: false}) }
      // if(this.state.mouseDownForWalls){ this.setState({mouseDownForWalls: false}); console.log('clear walls') }
      // this.setState({mouseDownForWall: false});
      return 'clearMouse'
   }

   handleOnMouseUp = (row, col) => {
      if(this.state.mouseDownForStart){ this.updateStartNode(row,col);}
      if(this.state.mouseDownForEnd){ this.updateEndNode(row, col); }
      this.clearMouse();
   }

   handleOnMouseEnter = (row, col) => {
      if(this.state.mouseDownForWalls){
         this.toggleWall(row, col);
      }
      // this.setState((prevState)=>{
      //    console.log('enter state')
      //    return{wiggle: !prevState.wiggle}
      // })
   }

   clearGrid = () => {
      const newGrid = getInitialGrid(this.state.config);
      this.setState({grid: newGrid, ranAStar: false})
   }

   updateStartNode = (row, col) => {
      this.setState((prevState)=>{
         const newState = {...prevState.config};
         newState.startNodeRow = row;
         newState.startNodeCol = col;
         const newGrid = getInitialGrid(newState);
         return {config: newState, grid: newGrid, ranAStar: false}
      })
   }

   updateEndNode = (row, col) => {
      this.setState((prevState)=>{
         const newConf = {...prevState.config};
         newConf.endNodeRow = row;
         newConf.endNodeCol = col;
         const newGrid = getInitialGrid(newConf);
         return {config: newConf, grid: newGrid, ranAStar: false}
      })
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
      this.setState({grid: newGrid, ranAStar: true})
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
               handleOnMouseEnter: this.handleOnMouseEnter
            } 
         }>
            {this.props.children}
         </VisualizerContext.Provider>
      )
   }
}






// const VisualizerContextComponent = (props) => {
//    const [config, setConfig] = useState( initialConfig );
//    const [grid, setGrid] = useState( getInitialGrid(config) );
//    const [mouseDownForStart, setMouseDownForStart] = useState(false);
//    const [mouseDownForEnd, setMouseDownForEnd] = useState(false);
//    const [mouseDownForWalls, setMouseDownForWalls] = useState(false);
//    const [ranAStar, setRanAStar] = useState(false);

//    useEffect(()=>{
//       window.addEventListener('mouseup', function(){
//          let c = clearMouse();
//       })
//       window.updateConfig = function(config){
//          setConfig(config)
//       }
//       window.clearGrid = function(){
//          clearGrid();
//       }
//       window.getConfig = function(){
//          console.log(config)
//       }
//    },[])

//    useEffect(()=>{
//       clearGrid();
//    },[config])


   
//    const handleOnMouseDown = ( type, row, col ) => {
//       switch(type){
//          case 'start':
//             console.log('start')
//             setMouseDownForStart(true);
//             clearGrid();
//             break;
//          case 'end':
//             setMouseDownForEnd(true);
//             clearGrid();
//             break;
//          case 'wall':
//             console.log('wall')
//             if(ranAStar){
//                console.log('ran it')
//                clearGrid();
//             }
//             setMouseDownForWalls(true);
//             toggleWall(row, col);
//             break;
//          default:
//             break;
//       }
//    }

//    const clearMouse = () => {
//       if(mouseDownForStart){ setMouseDownForStart(false) }
//       if(mouseDownForEnd){ setMouseDownForEnd(false) }
//       if(mouseDownForWalls){ setMouseDownForWalls(false); console.log('clear walls') }
//       setMouseDownForWalls(false);
//       return 'clearMouse'
//    }

//    const handleOnMouseUp = (row, col) => {
//       if(mouseDownForStart){ updateStartNode(row,col);}
//       if(mouseDownForEnd){ updateEndNode(row, col); }
//       clearMouse();
//    }

//    const handleOnMouseEnter = (row, col) => {
//       if(mouseDownForWalls){
//          toggleWall(row, col);
//       }
      
//    }

//    const clearGrid = () => {
//       console.log(config)
//       const newGrid = getInitialGrid(config);
//       setGrid(newGrid);
//       setRanAStar(false);
//    }

//    const updateStartNode = (row, col) => {
//       console.log('update start')
//       clearGrid();
//       const newConfig = {...config};
//       newConfig.startNodeRow = row;
//       newConfig.startNodeCol = col;
//       setConfig(newConfig);
//    }

//    const updateEndNode = (row, col) => {
//       console.log('update end')
//       clearGrid();
//       const newConfig = {...config};
//       newConfig.endNodeRow = row;
//       newConfig.endNodeCol = col;
//       setConfig(newConfig);
//    } 

//    const toggleWall = (row, col) => {
//       let canMakeWall = true;
//       if( row === config.startNodeRow && col === config.startNodeCol ){ canMakeWall = false }
//       if( row === config.endNodeRow && col === config.endNodeCol ){ canMakeWall = false }
//       if(canMakeWall){
//          const newGrid = addWallToGrid(grid, row, col)
//          setGrid(newGrid)
//       }
//    }

//    const runAStar = () => {
//       console.log('run', config)
//       const startNode = grid[config.startNodeRow][config.startNodeCol];
//       const endNode = grid[config.endNodeRow][config.endNodeCol];
//       const {path, orderVisited} = getAStarData(grid, startNode, endNode);
      
//       for(let i = 0; i < path.length; i++){
//          const n = path[i];
//          n.pathIndex = i;
//       }

//       for(let i = 0; i < orderVisited.length; i++){
//          const n = orderVisited[i];
//          n.orderVisited = i;
//          n.numOfNodesVisited = orderVisited.length;
//       }

//       const newGrid = generateNewGridFromPath(grid, path);
//       setGrid(newGrid);
//       setRanAStar(true);
//       console.log('ran', config)
//    }


//    return (
//       <VisualizerContext.Provider value={ 
//          {grid, config, toggleWall, runAStar, updateStartNode, updateEndNode, handleOnMouseDown, handleOnMouseUp, handleOnMouseEnter} 
//       }>
//          {props.children}
//       </VisualizerContext.Provider>
//    )
// }

export default VisualizerContextComponent;