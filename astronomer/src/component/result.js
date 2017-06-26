import React, { Component } from 'react';


class ResultContainer extends Component{
    constructor(props){
        super(props)
        this.state = {'view': 'table', 'result': props.result};

        this.props.emitter.addListener('result_view_switch', this.setView.bind(this));
    }

    setView(view){
        this.setState({
            view: view
        });
    }

    render(){
        console.log(this.state)
        return <li>
            <ResultTableManager data={this.props.result} />
        </li>
    }
}


class ResultControls extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return <div className="result_controls"></div>
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
        console.log('RESULT TABLE', this.props.data)
        let data = this.props.data;
        const headings = Object.keys(data[0])
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