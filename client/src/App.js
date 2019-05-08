import React, { Component } from 'react';
import './App.scss';
import { Main } from './main.js';
import { promiseGetLaunches } from './service.js';
import 'react-app-polyfill/ie11';

class App extends Component {

    render() {
        return (
           <div>
               <Main onLoad={ promiseGetLaunches } />
           </div>
        );
    }
}

export default App;
