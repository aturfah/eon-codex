import React from 'react';
import './App.css';
import FilterPanel from './FilterPanel/FilterPanel';
import Compendium from './Compendium/Compendium';

function App() {
  return (
    <div className="App">
      <FilterPanel></FilterPanel>
      <Compendium></Compendium>
    </div>
  );
}

export default App;
