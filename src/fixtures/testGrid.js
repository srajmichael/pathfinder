export const testGrid = [
   [
      {
         row: 0,
         col: 0,
         isWall: false,
         visited: false,
         parent: null,
         g: Infinity,
         h: Infinity,
         f: Infinity,
         pathIndex: null,
         timeOut: 30,
         isStart: null,
         isEnd: null,
         orderVisited: null,
         orderTimeOut: 10,
         numOfNodesVisited: null
      },
      {
         row: 0,
         col: 1,
         isWall: false,
         visited: false,
         parent: null,
         g: Infinity,
         h: Infinity,
         f: Infinity,
         pathIndex: null,
         timeOut: 30,
         isStart: null,
         isEnd: null,
         orderVisited: null,
         orderTimeOut: 10,
         numOfNodesVisited: null
      },
      {
         row: 0,
         col: 2,
         isWall: false,
         visited: false,
         parent: null,
         g: Infinity,
         h: Infinity,
         f: Infinity,
         pathIndex: null,
         timeOut: 30,
         isStart: null,
         isEnd: null,
         orderVisited: null,
         orderTimeOut: 10,
         numOfNodesVisited: null
      }
   ],
   [
      {
         row: 1,
         col: 0,
         isWall: false,
         visited: false,
         parent: null,
         g: Infinity,
         h: Infinity,
         f: Infinity,
         pathIndex: null,
         timeOut: 30,
         isStart: null,
         isEnd: null,
         orderVisited: null,
         orderTimeOut: 10,
         numOfNodesVisited: null
      },
      {
         row: 1,
         col: 1,
         isWall: false,
         visited: false,
         parent: null,
         g: Infinity,
         h: Infinity,
         f: Infinity,
         pathIndex: null,
         timeOut: 30,
         isStart: true,
         isEnd: null,
         orderVisited: null,
         orderTimeOut: 10,
         numOfNodesVisited: null
      },
      {
         row: 1,
         col: 2,
         isWall: false,
         visited: false,
         parent: null,
         g: Infinity,
         h: Infinity,
         f: Infinity,
         pathIndex: null,
         timeOut: 30,
         isStart: null,
         isEnd: null,
         orderVisited: null,
         orderTimeOut: 10,
         numOfNodesVisited: null
      }
   ],
   [
      {
         row: 2,
         col: 0,
         isWall: false,
         visited: false,
         parent: null,
         g: Infinity,
         h: Infinity,
         f: Infinity,
         pathIndex: null,
         timeOut: 30,
         isStart: null,
         isEnd: null,
         orderVisited: null,
         orderTimeOut: 10,
         numOfNodesVisited: null
      },
      {
         row: 2,
         col: 1,
         isWall: false,
         visited: false,
         parent: null,
         g: Infinity,
         h: Infinity,
         f: Infinity,
         pathIndex: null,
         timeOut: 30,
         isStart: null,
         isEnd: null,
         orderVisited: null,
         orderTimeOut: 10,
         numOfNodesVisited: null
      },
      {
         row: 2,
         col: 2,
         isWall: false,
         visited: false,
         parent: null,
         g: Infinity,
         h: Infinity,
         f: Infinity,
         pathIndex: null,
         timeOut: 30,
         isStart: null,
         isEnd: true,
         orderVisited: null,
         orderTimeOut: 10,
         numOfNodesVisited: null
      }
   ]
]

export const testNode = {
   row: 1,
   col: 1,
   isWall: true,
   visited: false,
   parent: null,
   g: Infinity,
   h: Infinity,
   f: Infinity,
   pathIndex: null,
   timeOut: 30,
   isStart: null,
   isEnd: null,
   orderVisited: null,
   orderTimeOut: 10,
   numOfNodesVisited: null
}

export const testGridConfig = {
   startNodeRow: 1,
   startNodeCol: 1,
   endNodeRow: 2,
   endNodeCol: 2,
   numOfRows: 3,
   numOfCols: 3,
   timeOut: 30,
   orderTimeOut: 10,
   nodeWidth: 20
}

export const testGridSingleNode = [
   [
      {
         row: 0,
         col: 0,
         isWall: false
      }
   ]
]