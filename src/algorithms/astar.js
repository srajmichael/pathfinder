import {
   getDistanceFromNode,
   getNodeWithLowestF,
   getNeighbors, 
   getFinalPath
} from '../utils/grid';

export function getAStarData(grid, startNode, endNode){
   const openNodes = [startNode];
   const closedNodes = [];
   const orderVisited = [];

   startNode.g = 0;
   startNode.h = getDistanceFromNode(startNode, endNode);
   while(openNodes.length > 0){
      let current = getNodeWithLowestF(openNodes);

      if(current === endNode){
         const path = getFinalPath(endNode);
         return {
            path: path,
            orderVisited,
            finished: true
         };
      }
      //remove current from openNodes and add to closedNodes
      removeFromArray(current, openNodes);
      closedNodes.push(current);

      let neighbors = getNeighbors(grid, current);
      for(let i = 0; i < neighbors.length; i++){
         const neighbor = neighbors[i];
         let tempG = current.g + getDistanceFromNode(current, neighbor);

         if( tempG < neighbor.g ){
            let h = getDistanceFromNode(endNode, neighbor);
            neighbor.parent = current;
            neighbor.g = tempG;
            neighbor.h = h
            neighbor.f = tempG + h;
            
            if(openNodes.indexOf(neighbor) === -1){
               openNodes.push(neighbor);
            }
         }

         if(orderVisited.indexOf(neighbor) === -1){
            orderVisited.push(neighbor);
         }

      }

   }
   return {
      path: [],
      orderVisited,
      finished: false
   };
}

export function astar(grid, startNode, endNode){
   const openNodes = [startNode];
   const closedNodes = [];
   
   startNode.g = 0;
   startNode.h = getDistanceFromNode(startNode, endNode);
   while(openNodes.length > 0){
      let current = getNodeWithLowestF(openNodes);

      if(current === endNode){
         const path = getFinalPath(endNode);
         return path;
      }
      //remove current from openNodes and add to closedNodes
      removeFromArray(current, openNodes);
      closedNodes.push(current);

      let neighbors = getNeighbors(grid, current);
      for(let i = 0; i < neighbors.length; i++){
         const neighbor = neighbors[i];
         let tempG = current.g + getDistanceFromNode(current, neighbor);

         if( tempG < neighbor.g ){
            let h = getDistanceFromNode(endNode, neighbor);
            neighbor.parent = current;
            neighbor.g = tempG;
            neighbor.h = h
            neighbor.f = tempG + h;
            
            if(openNodes.indexOf(neighbor) === -1){
               openNodes.push(neighbor);
            }
         }
      }

   }
   return [];
}




export function removeFromArray(item, array){
   const i = array.indexOf(item);
   array.splice(i,1)
}