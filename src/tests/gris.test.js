import {getInitialGrid, createNode} from '../utils/grid';
import {testGrid, testGridConfig, testNode} from '../fixtures/testGrid';





test('createNode',()=>{
   const newNode = createNode(1,1, testGridConfig, true);
   expect(newNode).toMatchObject(testNode)
})

test('getInitialGrid',()=>{
   const newGrid = getInitialGrid(testGridConfig)
   expect(newGrid).toMatchObject(testGrid)
})