import React, { Component } from 'react';
import ResultContainer from '../Result/Result';
import './List.css';


class MainList extends Component {
    constructor(props){
        super(props);
        const results = props['results'] || [];
        this.state = {results: results}
        this.props.emitter.addListener('new_result', this.newResult.bind(this));
    }

    newResult(data, query){
        data = {
            'data': data,
            'query': query,
            'date': (new Date()).toISOString()
        };

        this.setState(function(prev, props){
            prev.results.push(data);

            return {'results': prev.results};
        });
    }

    render(){
        let results = this.state.results;

        return <ul className="MainList">
            {[...results].reverse().map((result, i) => {
                return <ResultContainer key={result['date']}
                    result={result['data']}
                    query={result['query']}
                    emitter={this.props.emitter} />
            })}
        </ul>
    }
}

export default MainList;
