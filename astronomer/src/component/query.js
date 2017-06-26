import React, { Component } from 'react';
import reqwest from 'reqwest';


class MainQuery extends Component {
    constructor(props){
        super(props)
        this.state = {value: 'g.V().hasLabel("user")'};
        this.handleChange = this.handleChange.bind(this);
        this.submitQuery = this.submitQuery.bind(this);
    }

    handleChange(e){
        this.setState({value: e.target.value });
    }

    submitQuery(e){
        e.preventDefault();
        let data = {'query': this.state.value}

        reqwest({
            url: 'http://localhost:9911/query',
            method: 'post',
            data: data,
            success: function(resp) {
                this.props.emitter.emit('new_result', resp)
            }.bind(this)
        });
    }

    render(){
        return (
            <form>
                <label>
                    <input type="text" value={ this.state.value } name="query" onChange={ this.handleChange }/>
                </label>
                <button type="Submit" onClick={ this.submitQuery }>Query</button>
            </form>
        )
    }
}

export default MainQuery;
