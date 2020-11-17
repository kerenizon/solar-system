import React from 'react';
import '../css/index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class ThemeToggler extends React.Component {


  handleToggle = () => {
    console.log('toggle');
    document.querySelector('.homepage').classList.toggle('dark');
    document.querySelector('.centerSection').classList.toggle('dark');
    document.querySelector('.rightSection').classList.toggle('dark');
  }



  render(){
    return (
      <div className="themeToggler">
	      <input type="checkbox" className="checkbox" onChange={this.handleToggle.bind(this)} />
	      <label className="label">
          <FontAwesomeIcon className="fas fa-moon" icon={["fas", "moon"]}/>
          <FontAwesomeIcon className="fas fa-sun" icon={["fas", "sun"]} />
		      <div className="ball"></div>
	      </label>
      </div>
    );
  }
}

export default ThemeToggler;
