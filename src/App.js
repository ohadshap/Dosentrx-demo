import React, { Component } from 'react';
import './App.css';
import { observer } from 'mobx-react'
import PatientPopup from './components/PatientPopup';
import NewTreat from './components/NewTreat'

@observer
class App extends Component {
  render() {
    return (
      <div className="App">
        Im App
        
        <NewTreat />
      </div>
    );
  }
}

export default App;
//<PatientPopup />