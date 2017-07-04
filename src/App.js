import React, { Component } from 'react';
import './App.css';
import MainList from './component/List/List';
import MainQuery from './component/Query/Query';
import Modal from './component/Modal/Modal';
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
                <Modal emitter={ this.emitter } />
            </div>
        );
    }
}

export default App;
