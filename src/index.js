import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'mobx-react'
import {MainStore as mainstore} from './stores/MainStore'
import {Inputs} from './stores/InputStore'

const MainStore = new mainstore()
const InputStore = new Inputs()

const stores = {MainStore, InputStore}

ReactDOM.render(<Provider {... stores}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
