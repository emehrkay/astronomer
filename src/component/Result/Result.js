import React, { Component } from 'react';
import './Result.css';
import ResultTableManager from './Table/Table'


class ResultContainer extends Component{
    constructor(props){
        super(props)
        this.state = {
            'view': 'table',
            'result': props.result,
            'query': props.query,
            'setView': this.setView.bind(this)
        };

        this.props.emitter.addListener('result_view_switch', this.setView.bind(this));
    }

    setView(view){
        this.setState({
            view: view
        });
    }

    render(){
        return <li className="ResultContainer">
            <div className="result_controls">
                <ResultControls
                    setView={this.props.setView}
                    query={this.props.query}
                    emitter={this.props.emitter} />
            </div>
            <div className="result_container">
                <ResultTableManager data={this.props.result}
                    setView={this.props.setView}
                    emitter={this.props.emitter} />
            </div>
        </li>
    }
}


class ResultControls extends Component{
    constructor(props){
        super(props)
        this.rerunQuery = this.rerunQuery.bind(this);
    }

    rerunQuery(){
        this.props.emitter.emit('run_query', this.props.query);
    }

    render(){
        return <div className="result_controls">
            <span>{this.props.query}</span>
            <a href="#" onClick={this.rerunQuery}>rerun query</a>
        </div>
    }
}


export default ResultContainer;