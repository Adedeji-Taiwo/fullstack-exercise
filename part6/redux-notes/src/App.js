import React from 'react';
import './App.css';
import Notes from './components/Notes';
import NewNote from './components/NewNote';
import VisibilityFilter from './components/VisibilityFilter';


const App = () => {

  return (
    <div className='App'>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}


export default App;