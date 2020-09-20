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
   toggleWall,
   orderVisited,
   orderTimeOut,
   numOfNodesVisited
}) => {
   const nodeRef = useRef();
   const nodeClasses = isWall ? 'node wall' : isStart ? 'node start' : isEnd ? 'node end' : 'node';

   if(pathIndex || pathIndex === 0){
      const to = (timeOut * pathIndex) + (orderTimeOut * numOfNodesVisited)
      setTimeout(function(){
         nodeRef.current.classList.add('path')
      }, to)
   }

   if(orderVisited || orderVisited === 0){
      const to = (orderTimeOut * orderVisited);
      const opacity = .4 + (.6 * (orderVisited/numOfNodesVisited))
      const bg = `rgba(235, 64, 52,${opacity})`
      setTimeout(function(){
         nodeRef.current.classList.add('visited')
         nodeRef.current.style.background = bg;
         nodeRef.current.style.borderColor = 'transparent';
      }, to)
   }

   const handleOnClick = () => {
      toggleWall(row,col)
   }

   return (
      <div ref={nodeRef} className={nodeClasses} onClick={handleOnClick}>
      </div>
   )
}

export default Node;