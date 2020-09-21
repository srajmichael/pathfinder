import React, {useRef, useContext} from 'react';

import {VisualizerContext} from '../VisualizerContext';
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
   const {
      handleOnMouseDown,
      handleOnMouseUp,
      handleOnMouseEnter
   } = useContext(VisualizerContext);

   if( (pathIndex || pathIndex === 0) && nodeRef.current){
      const to = (timeOut * pathIndex) + (orderTimeOut * numOfNodesVisited)
      setTimeout(function(){
         nodeRef.current.classList.add('path')
      }, to)
   }else if(nodeRef.current){
      nodeRef.current.classList.remove('path')
   }

   if((orderVisited || orderVisited === 0) && nodeRef.current){
      const to = (orderTimeOut * orderVisited);
      const opacity = .4 + (.6 * (orderVisited/numOfNodesVisited))
      const bg = `rgba(235, 64, 52,${opacity})`
      setTimeout(function(){
         nodeRef.current.classList.add('visited')
         nodeRef.current.style.background = bg;
         nodeRef.current.style.borderColor = 'transparent';
      }, to)
   }else if(nodeRef.current){
      nodeRef.current.classList.remove('visited')
      nodeRef.current.style.background = '';
      nodeRef.current.style.borderColor = '';
   }

   const handleOnClick = () => {
      toggleWall(row,col)
   }

   const onDragOver = (e) => {
      e.preventDefault()
      e.stopPropagation()
   }
   const onDrop = (e) => {
      e.preventDefault()
      handleOnMouseUp(row,col)
   }
   const onSpanDrag = (e) => {
      e.preventDefault()
   }
   return (
      <div 
         onDragOver={(e)=>{onDragOver(e)}}
         onDrop={onDrop}
         ref={nodeRef} 
         className={nodeClasses} 
         onMouseDown={(e)=>{handleOnMouseDown( isStart ? 'start' : isEnd ? 'end' : 'wall', row, col)}}
         onMouseEnter={(e)=>{handleOnMouseEnter(row, col)}}
      >
         { (isStart || isEnd) && <span draggable onDrag={onSpanDrag}></span>}
      </div>
   )
}

export default Node;