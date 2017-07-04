import React, { Component } from 'react';
import './Table.css';


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
                return <ResultTable key={i} data={ds}
                    emitter={this.props.emitter} />
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
        let headings = Object.keys(data[0]['properties']);
        headings.sort();
        headings.unshift('id', 'label');

        return <div className="ResultTable">
            <ResultTableControls />
            <table>
                <thead>
                    <tr>
                        {headings.map((head, i) =>{
                            return <th key={i}>{head}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, i) => {
                        return <ResultTableRow
                            key={row.id + '-'+ i}
                            data={row}
                            headings={headings}
                            emitter={this.props.emitter} />
                    })}
                </tbody>
            </table>
        </div>
    }
}


class ResultTableControls extends Component{
    
    render(){
        return <div>table controls</div>
    }
}


class ResultTableRow extends Component{
    constructor(props){
        super(props)
        let row_data = this.props.data.properties;
        row_data['id'] = this.props.data.id;
        row_data['label'] = this.props.data.label;
        this.state = {row_data}
        this.doubleClick = this.doubleClick.bind(this)
    }

    doubleClick(){
        this.props.emitter.emit('modal_show');
        this.props.emitter.emit('modal_content',
            <ResultEditForm emitter={this.props.emitter}
                data={this.props.data}
                row_data={this.state.row_data} />)
    }

    render(){
        let headings = this.props.headings;

        return <tr onDoubleClick={this.doubleClick}>
            {headings.map((heading, i) => {
                return <ResultTableCell key={i}
                    value={ this.state.row_data[heading] } />
            })}
        </tr>
    }
}


class ResultTableCell extends Component{
    constructor(props){
        super(props)
    }

    render(){
        let content = 'none'

        if(Array.isArray(this.props.value)){
            content = <ResultTableCellMultiValue value={this.props.value} />
        }else{
            content = this.props.value;
        }

        return <td>{ content }</td>
    }
}


class ResultTableCellMultiValue extends Component{
    constructor(props){
        super(props)
    }

    render(){
        const links = this.props.value.map((value, i) => {
            return <span key={value.id +'--'+ i} id={value.id}>{value.value}</span>
        });

        return <div>
            {links}
        </div>
    }
}


class ResultEditForm extends Component{
    constructor(props){
        super(props)
        this.state = {'properties': this.props.data.properties}
    }

    render(){
        console.log('prop', this.state)
        const fields = [];

        for(let [name, value] of Object.entries(this.state.properties)){
            fields.push(<ResultEditFormEntry value={value}
                name={name}
                key={name} />)
        }

        return <form className="ResultEditForm">
            { fields }
        </form>
    }
}

class ResultEditFormEntry extends Component{
    constructor(props){
        super(props)
        this.state = {'value': this.props.value}
        this.onChange = this.onChange.bind(this);
        this.addValue = this.addValue.bind(this);
        this.removeValue = this.removeValue.bind(this);
    }

    onChange(){
        
    }

    addValue(){
        let self = this;

        this.setState(function(prev, props){
            var val = prev.value
            
            val.push({
                'id': self.props.name + '-' + Math.random(),
                'value': ''
            });

            return {
                'value': val
            }
        });
    }

    removeValue(id){
        this.setState(function(prev, props){
            var values = prev.value.filter(function(val){
                return val.id != id;
            })

            return {
                'value': values
            }
        });
    }

    render(){
        var self = this,
            inputs = []

        if(this.state.value && Array.isArray(this.state.value)){
            for(var i = 0, l = this.state.value.length; i < l; i++){
                var val = this.state.value[i],
                    removeValue = function(){
                        self.removeValue(val.id);
                    };

                inputs.push(<ResultEditFormInput value={val.value}
                    key={val.id}
                    removeValue={removeValue} />)
            }
        }

        return <div className="result_edit_form_entry">
            <label>
                <span>{this.props.name} <a href="#" onClick={this.addValue}>add value</a></span>
                {inputs}
            </label>
        </div>
    }
}


class ResultEditFormInput extends Component{
    constructor(props){
        super(props)

        this.state = {'value': this.props.value}
        this.onChange = this.onChange.bind(this)
        this.removeInput = this.removeInput.bind(this)
    }

    onChange(e){
        this.setState({
            'value': e.target.value
        });
    }

    removeInput(){
        this.props.removeValue()
    }

    render(){
        return <div>
            <input value={this.state.value} onChange={this.onChange} />
            <a href="#" onClick={this.removeInput}>remove</a>
        </div>
    }
}


export default ResultTableManager;
