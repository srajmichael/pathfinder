import {
   getDistanceFromNode,
   getNodeWithLowestF,
   getNeighbors, 
   getFinalPath
} from '../utils/grid';


export function getAStarData(grid, startNode, endNode){
   const openNodes = [startNode];
   const closedNodes = [];
   const orderVisited = [startNode]; //The order of nodes visited from start to finish
   let noNodesLeft = false; //flag to know if the end node can't be reached

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

export function removeFromArray(item, array){
   const i = array.indexOf(item);
   array.splice(i,1)
}