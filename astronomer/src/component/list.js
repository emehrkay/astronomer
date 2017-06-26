import React, { Component } from 'react';
import ResultContainer from './result';
import './list.css';


class MainList extends Component {
    constructor(props){
        super(props);
        const results = props['results'] || [];
        this.state = {results: results}
        this.props.emitter.addListener('new_result', this.newResult.bind(this));
    }

    newResult(data, query){
        console.log('NEW RESULT', data)
        data = {
            'data': data,
            'query': query
        };

        this.setState((prev, props) => {
            results: prev.results.push(data);
        });
    }

    render(){
        let results = this.state.results;

        return <ul className="MainList">
            {results.map((result, i) => {
                return <ResultContainer key={i} result={result['data']}
                    query={result['query']}
                    emitter={this.props.emitter} />
            })}
        </ul>
    }
}

export default MainList;
