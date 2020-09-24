import React from 'react';


const VisualizerButton = (props) => {
   return(
      <div>
         <button onClick={props.onClick}>{props.buttonText}</button>
      </div>
   )
}

export default VisualizerButton;