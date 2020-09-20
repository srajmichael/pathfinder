export function getAStarData(grid, startNode, endNode){
   const openNodes = [startNode];
   const closedNodes = [];
   const orderVisited = [startNode];
   let noNodesLeft = false;

   let currentNode = startNode;

   startNode.gCost = 0;
   startNode.hCost = getDistanceFromNode(startNode, endNode);

   while(currentNode !== endNode && !noNodesLeft ){
      const currentNeighbors = getNeighbors(grid, currentNode);
      if(currentNeighbors.length === 0){
         noNodesLeft = true;
         break;
      }

      for(const neighbor of currentNeighbors){
         if(closedNodes.indexOf(neighbor) === -1 && openNodes.indexOf(neighbor) === -1){
            openNodes.push(neighbor);
            const g = getDistanceFromNode(startNode, neighbor);
            const h = getDistanceFromNode(endNode, neighbor);
            const f = g + h;
            if(f < (neighbor.gCost + neighbor.hCost)){
               neighbor.gCost = g;
               neighbor.hCost = h;
               neighbor.f = f;
               neighbor.parent = currentNode;
            }
         }

         if(orderVisited.indexOf(neighbor) === -1){
            orderVisited.push(neighbor);
         }

      }
      removeFromArray(currentNode, openNodes);
      closedNodes.push(currentNode);
      currentNode = getNodeWithLowestF(openNodes);
   }

   const path = getFinalPath(endNode);
   return {
      path: noNodesLeft ? [] : path,
      orderVisited
   };

}




export function astar(grid, startNode, endNode){
   const openNodes = [startNode];
   const closedNodes = [];

   let currentNode = startNode;
   
   startNode.gCost = 0;
   startNode.hCost = getDistanceFromNode(startNode, endNode);

   while(currentNode !== endNode){
      const currentNeighbors = getNeighbors(grid, currentNode);

      for(const neighbor of currentNeighbors){
         if(closedNodes.indexOf(neighbor) === -1 && openNodes.indexOf(neighbor) === -1){
            openNodes.push(neighbor);
            const g = getDistanceFromNode(startNode, neighbor);
            const h = getDistanceFromNode(endNode, neighbor);
            const f = g + h;
            if(f < (neighbor.gCost + neighbor.hCost)){
               neighbor.gCost = g;
               neighbor.hCost = h;
               neighbor.f = f;
               neighbor.parent = currentNode;
            }
         }
      }
      removeFromArray(currentNode, openNodes);
      closedNodes.push(currentNode);
      currentNode = getNodeWithLowestF(openNodes);
   }

   const path = getFinalPath(endNode);
   return path;
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