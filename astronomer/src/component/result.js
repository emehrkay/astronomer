import React, { Component } from 'react';
import './result.css';


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
                <ResultTableManager data={this.props.result} setView={this.props.setView} />
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
            <a href="#" onClick={this.rerunQuery}>rerun query</a>
        </div>
    }
}


class ResultTableManager extends Component{
    constructor(props){
        super(props)
    }

    render(){
        var data_sets = [],
            prev_headings = '';

        for(let i = 0, l = this.props.data.length; i < l; i++){
            let val = this.props.data[i],
                headings = Object.keys(val.properties).toString(),
                data = [];

            if(!data_sets.length || headings != prev_headings) {
                prev_headings = headings;
                data_sets.push(data);
            }else{
                data = data_sets.slice(-1)[0];
            }

            data.push(val);
        }

        return <div>
            {data_sets.map((ds, i) => {
                return <ResultTable key={i} data={ds} />
            })}
        </div>
    }
}


class ResultTable extends Component{
    constructor(props){
        super(props)
    }

    render(){
        let data = this.props.data;
        const headings = Object.keys(data[0]['properties'])
        return <table>
            <thead>
                <tr>
                    {headings.map((head, i) =>{
                        return <th key={i}>{head}</th>
                    })}
                </tr>
            </thead>
            <tbody>
                {data.map((row, i) => {
                    return <tr key={i}>
                        { Object.values(row.properties).map((prop, x) => {
                            return <td key={prop[0].id}>{ prop[0].value }</td>
                        })}
                    </tr>
                })}
            </tbody>
        </table>
    }
}


export default ResultContainer;