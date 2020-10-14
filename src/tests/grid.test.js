import {getInitialGrid, createNode, addWallToGrid} from '../utils/grid';
import {
   testGrid, 
   testGridConfig, 
   testNode,
   testGridSingleNode
} from '../fixtures/testGrid';





test('createNode',()=>{
   const newNode = createNode(1,1, testGridConfig, true);
   expect(newNode).toMatchObject(testNode)
})

test('getInitialGrid',()=>{
   const newGrid = getInitialGrid(testGridConfig)
   expect(newGrid).toMatchObject(testGrid)
})

test('addWallToGrid - toMatchObject', ()=>{
   const toBeGrid = testGridSingleNode.map(row => {
      const newR = [];
      for(let rI of row){
         const obj = {...rI};
         newR.push(obj)
      }
      return newR;
   });
   toBeGrid[0][0].isWall = true;
   const testGrid = addWallToGrid(testGridSingleNode, 0,0)
   expect(testGrid).toMatchObject(toBeGrid)

})

test('addWallToGrid - not toMatchObject', ()=>{
   const toBeGrid = testGridSingleNode.map(row => {
      const newR = [];
      for(let rI of row){
         const obj = {...rI};
         newR.push(obj)
      }
      return newR;
   });
   toBeGrid[0][0].isWall = false;

   const testGrid = addWallToGrid(testGridSingleNode, 0,0)

   expect(testGrid).not.toMatchObject(toBeGrid)
})