import React, { Component } from 'react';
import './App.css';
import MainList from './component/list';
import MainQuery from './component/query';
import {EventEmitter} from 'fbemitter';


class App extends Component {
    constructor(props){
        super(props)
        this.emitter = new EventEmitter();
    }

    render(){
        return (
            <div className="App">
                <MainQuery emitter={ this.emitter } />
                <MainList emitter={ this.emitter } />
            </div>
        );
    }
}

export default App;
