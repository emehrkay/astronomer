import React, { Component } from 'react';
import ResultContainer from './result';


class MainList extends Component {
    constructor(props){
        super(props);
        const results = props['results'] || [];
        this.state = {results: results}
        this.props.emitter.addListener('new_result', this.newResult.bind(this));
    }

    newResult(data){
        console.log('NEW RESULT', data)
        this.setState((prev, props) => {
            results: prev.results.push(data);
        });
    }

    render(){
        let results = this.state.results;

        return <ul className="main_list">
            {results.map((result, i) => {
                return <ResultContainer key={i} result={result} emitter={this.props.emitter} />
            })}
        </ul>
    }
}

export default MainList;
