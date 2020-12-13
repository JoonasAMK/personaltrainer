import './App.css';
import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Home from './components/Home';
import Trainings from './components/Trainings';
import Cal from './components/Cal';

function App() {
  const [value, setValue] = useState('one');
  

  const handleChange = (event, value) => {
    setValue(value);
    };
  return (
    <div className="App">
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab value="one" label="Home" />
          <Tab value="two" label=" All Trainings" />
          <Tab value="three" label="Calendar" />
        </Tabs>
      </AppBar>
      {value === 'one' && <Home />}
      {value === 'two' && <Trainings />}
      {value === 'three' && <Cal />}
    </div>
  );
}

export default App;
