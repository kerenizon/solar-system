import React from 'react';
import '../css/index.css';

class Spinner extends React.Component {

  render(){   
    return (
      <div className="spin spinner_2">
        <div className="circle circle_1"></div>
        <div className="circle circle_2"></div>
        <div className="circle circle_3"></div>
      </div>
    );  
  }
}

export default Spinner;
