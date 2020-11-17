import React, { useState } from 'react';
import './css/App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header';
import Homepage from './components/Homepage';
import Planet from './components/Planet';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
library.add(faMoon, faSun);



function App() {

  const [refArr, setRefArr] = useState([]);

  const handleRefs = (refs) => {
    setRefArr(refs);
  }

  localStorage.clear();
  const data = JSON.parse(localStorage.getItem('data'));

  return (
    <div className="App">
      <BrowserRouter>
        <div role="tablist" aria-label="solar-system-around-you">
          <Header refs={handleRefs} data={data}/>
        </div>
        <div className="planets">
          <Route path="/" exact render={(props) => ( <Homepage {...props} refs={refArr}/>)}/>
          <Route path="/sun" exact render={(props) => ( <Planet {...props} index={0} classImg={'sunImg'} name={'Sun'} refs={refArr}/>)}/>
          <Route path="/mercury" exact render={(props) => ( <Planet {...props} index={2} classImg={'mercuryImg'} name={'Mercury'} refs={refArr}/>)}/>
          <Route path="/venus" exact render={(props) => ( <Planet {...props} index={3} classImg={'venusImg'} name={'Venus'} refs={refArr}/>)}/>
          <Route path="/moon" exact render={(props) => ( <Planet {...props} index={1} classImg={'moonImg'} name={'Moon'} refs={refArr}/>)}/>
          <Route path="/mars" exact render={(props) => ( <Planet {...props} index={5} classImg={'marsImg'} name={'Mars'} refs={refArr}/>)}/>
          <Route path="/jupiter" exact render={(props) => ( <Planet {...props} index={6} classImg={'jupiterImg'} name={'Jupiter'} refs={refArr}/>)}/>
          <Route path="/saturn" exact render={(props) => ( <Planet {...props} index={7} classImg={'saturnImg'} name={'Saturn'} refs={refArr}/>)}/>
          <Route path="/uranus" exact render={(props) => ( <Planet {...props} index={8} classImg={'uranusImg'} name={'Uranus'} refs={refArr}/>)}/>
          <Route path="/neptune" exact render={(props) => ( <Planet {...props} index={9} classImg={'neptuneImg'} name={'Neptune'} refs={refArr}/>)}/>
          <Route path="/pluto" exact render={(props) => ( <Planet {...props} index={10} classImg={'plutoImg'} name={'Pluto'} refs={refArr}/>)}/>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
