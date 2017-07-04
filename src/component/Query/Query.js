import React, { Component } from 'react';
import reqwest from 'reqwest';
import './Query.css';
import QueryResult from '../../Result';


class MainQuery extends Component {
    constructor(props){
        super(props)
        this.state = {value: 'g.V().hasLabel("user")'};
        this.handleChange = this.handleChange.bind(this);
        this.submitQuery = this.submitQuery.bind(this);

        this.props.emitter.addListener('run_query', this.runQuery.bind(this));
    }

    handleChange(e){
        this.setQuery(e.target.value);
    }

    runQuery(query){
        this.setQuery(query, this.submitQuery.bind(this));
    }

    setQuery(query, callback){
        callback = callback || function(){};

        this.setState({value: query}, callback);
    }

    submitQuery(e, query){
        if(e){
            e.preventDefault();
        }

        let data = {'query': this.state.value}

        reqwest({
            url: 'http://localhost:9911/query',
            method: 'post',
            data: data,
            success: function(resp) {
                const results = resp.map((res, i) => {
                    return new QueryResult(res)
                });

                this.props.emitter.emit('new_result', resp, this.state.value)
            }.bind(this)
        });
    }

    render(){
        return (
            <div className="MainQuery">
                <form onSubmit={this.submitQuery}>
                    <label>
                        <input type="text"
                            value={ this.state.value }
                            name="query"
                            onChange={ this.handleChange }/>
                    </label>
                    <button type="Submit" onClick={ this.submitQuery }>run query</button>
                </form>
            </div>
        )
    }
}

export default MainQuery;
