export const getInitialGrid = (config) => {
   const grid = [];
   for(let row = 0; row < config.numOfRows; row++){
      const currentRow = [];
      for(let col = 0; col < config.numOfCols; col++){
         const node = createNode(row,col, config);
         if(config.startNodeRow === row && config.startNodeCol === col){
            node.isStart = true;
         }
         if(config.endNodeRow === row && config.endNodeCol === col){
            node.isEnd = true;
         }
         currentRow.push(node)
      }
      grid.push(currentRow)
   }
   return grid;
}


export const createNode = (row,col, config, isWall = false) => {
   return {
      row,
      col,
      isWall: isWall,
      visited: false,
      parent: null,
      gCost: Infinity,
      hCost: Infinity,
      f: Infinity,
      pathIndex: null,
      timeOut: config.timeOut,
      isStart: null,
      isEnd: null,
      orderVisited: null,
      orderTimeOut: config.orderTimeOut,
      numOfNodesVisited: null
   }
}


export const generateNewGridFromPath = (grid, path) => {
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

export const addWallToGrid = (grid, row, col) => {
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


export function getAllGridNodes(grid){
   const nodes = [];
   for(let row = 0; row<grid.length; row++){
      for(let col = 0; col < grid[0].length; col++){
         nodes.push(grid[row][col])
      }
   }
   return nodes;
}

export function getNeighbors(grid, node){
   const numOfRows = grid.length;
   const numOfColumns = grid[0].length;
   const neighbors = [];
   
   if(node){
      if(node.row > 0){ neighbors.push(grid[node.row - 1][node.col]) }
      if(node.row < numOfRows - 1){ neighbors.push(grid[node.row + 1][node.col]) }
      if(node.col > 0){ neighbors.push(grid[node.row][node.col - 1]) }
      if(node.col < numOfColumns - 1){ neighbors.push(grid[node.row][node.col + 1]) }
   }

   return neighbors.filter(neigh => !neigh.isWall);
}

export function getDistanceFromNode(node1, node2, allowDiagonals = false){
   const rows = Math.abs(node1.row - node2.row);
   const cols = Math.abs(node1.col - node2.col);
   return rows + cols;
}

export function getClosestNeighborNode(currentNode, grid){
   
}

export function removeFromArray(item, array){
   const i = array.indexOf(item);
   array.splice(i,1)
}

export function getNodeWithLowestF(openNodes){
   let lowestNode = null;
   for(let node of openNodes){
      if( !lowestNode || node.f < lowestNode.f ){
         lowestNode = node;
      }
   }
   return lowestNode;
}

export function getFinalPath(endNode){
   const path = [];
   let current = endNode;
   while(current.parent){
      path.unshift(current);
      current = current.parent;
   }
   path.unshift(current);
   return path;
}

export function generateGridWithWalls(config, oldGrid){
   const grid = [];
   for(let row = 0; row < config.numOfRows; row++){
      const currentRow = [];
      for(let col = 0; col < config.numOfCols; col++){
         const node = createNode(row,col, config);
         if(config.startNodeRow === row && config.startNodeCol === col){
            node.isStart = true;
         }
         if(config.endNodeRow === row && config.endNodeCol === col){
            node.isEnd = true;
         }
         node.isWall = oldGrid[row][col].isWall;
         currentRow.push(node)
      }
      grid.push(currentRow)
   }
   return grid;
}