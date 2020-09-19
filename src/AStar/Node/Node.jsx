import React, {useRef} from 'react';

import './Node.css';

const Node = ({
   row,
   col,
   isWall,
   pathIndex,
   timeOut,
   isStart,
   isEnd,
   toggleWall
}) => {
   const nodeRef = useRef();
   const nodeClasses = isWall ? 'node wall' : isStart ? 'node start' : isEnd ? 'node end' : 'node';

   if(pathIndex || pathIndex === 0){
      setTimeout(function(){
         nodeRef.current.classList.add('path')
      }, (timeOut * pathIndex))
   }

   const handleOnClick = () => {
      toggleWall(row,col)
   }

   return (
      <div ref={nodeRef} className={nodeClasses} onClick={handleOnClick}>
         { '' + row + ',' + col }
      </div>
   )
}

export default Node;