import React, { Component } from 'react';
import './App.css';
import { observer, inject } from 'mobx-react'
import PatientPopup from './components/PatientPopup';
import NewTreat from './components/NewTreat'
import Summary from './components/Summary';

@inject("MainStore")
@observer
class App extends Component {
  render() {
    return (
      <div className="App">
        {/* Im App */}
        {
          this.props.MainStore.stage === 0 ? <PatientPopup /> :
          this.props.MainStore.stage === 1 ? <NewTreat /> :
          <Summary />
        }
      </div>
    );
  }
}

export default App;
//<PatientPopup /> <NewTreat /> <Summary />