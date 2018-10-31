import React from 'react';
import loadingGif from '../../images/Spin-1s-200px.gif';
import './Loading.css';

const Loading = () => {
  return ( 
    <div className="loading-wrapper">
      <img src={loadingGif} className="loading-gif" alt="loading" />
    </div>  
  );
};
 
export default Loading;