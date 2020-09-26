import React, {useState, useRef, useContext} from 'react';
import { useEffect } from 'react';

import {VisualizerContext} from '../VisualizerContext';
import './Node.css';

const Node = (props) => {
   const {
      row,
      col,
      nodeWidth,
      isWall,
      pathIndex,
      timeOut,
      isStart,
      isEnd,
      toggleWall,
      orderVisited,
      orderTimeOut,
      numOfNodesVisited
   } = props;

   const {
      handleOnMouseDown,
      handleOnMouseUp,
      handleOnMouseEnter,
      grid
   } = useContext(VisualizerContext);

   const nodeRef = useRef();
   const [color, setColor] = useState('rgba(235, 64, 52, 0)');
   const [pathTimeout, setPathTimeout] = useState(null);
   const [orderTimeout, setOrderTimeout] = useState(null);

   
   const nodeClasses = isWall ? 'node wall' : isStart ? 'node start' : isEnd ? 'node end' : 'node';

   useEffect(()=>{
      if(nodeRef.current){
         if((pathIndex || pathIndex === 0)){
            const tO = (timeOut * pathIndex) + (orderTimeOut * numOfNodesVisited)
            const tOP = setTimeout(()=>{
               nodeRef.current.classList.add('path');
               setPathTimeout(null);
            }, tO);
            setPathTimeout(tOP);
         }else if(pathTimeout){
            clearTimeout(pathTimeout);
            setPathTimeout(null);
            nodeRef.current.classList.remove('path');
         }else{
            nodeRef.current.classList.remove('path');
         }

         if(orderVisited || orderVisited === 0){
            const to = (orderTimeOut * orderVisited);
            const opacity = .4 + (.6 * (orderVisited/numOfNodesVisited));
            const bg = `rgba(235, 64, 52,${opacity})`;
            const tOo = setTimeout(()=>{
               nodeRef.current.classList.add('visited')
               nodeRef.current.style.background = bg;
               nodeRef.current.style.borderColor = 'transparent';
               setOrderTimeout(null);
            }, to);
            setOrderTimeout(tOo);
         }else if(orderTimeout){
            clearTimeout(orderTimeout);
            setOrderTimeout(null);
            nodeRef.current.classList.remove('visited')
            nodeRef.current.style.background = '';
            nodeRef.current.style.borderColor = '';
         }else{
            nodeRef.current.classList.remove('visited')
            nodeRef.current.style.background = '';
            nodeRef.current.style.borderColor = '';
         }
      }

   }, [orderVisited, pathIndex])

   const handleOnClick = () => {
      toggleWall(row,col)
   }

   const onDragOver = (e) => {
      e.preventDefault()
      e.stopPropagation()
   }
   const onDrop = (e) => {
      e.preventDefault()
      handleOnMouseUp(row,col, grid)
   }
   const onSpanDrag = (e) => {
      e.preventDefault()
   }
   const onDragLeave = (e) => {
      e.preventDefault();
   }
   const onDragStart = (e) => {
      e.preventDefault();
   }

   const onDragStartEnds = (e) => {
   }

   const nodeStyles = {
      width: `${nodeWidth}px`,
      height: `${nodeWidth}px`
   }

   return (
      <div 
         style={nodeStyles}
         onDragEnter={onDragLeave}
         onDragLeave={onDragLeave}
         onDragOver={(e)=>{onDragOver(e)}}
         onDrop={onDrop}
         onDragStart={ (isStart || isEnd) ? onDragStartEnds : onDragStart}
         ref={nodeRef} 
         className={nodeClasses} 
         onMouseDown={(e)=>{handleOnMouseDown( isStart ? 'start' : isEnd ? 'end' : 'wall', row, col, isWall, grid); }}
         onMouseEnter={(e)=>{handleOnMouseEnter(row, col)}}
      >
         { (isStart || isEnd) && <span draggable onDrag={onSpanDrag}></span>}
      </div>
   )
}

export default Node;