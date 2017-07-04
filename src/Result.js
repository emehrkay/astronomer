class QueryResults{
    constructor(results){
        this.results = results;
    }
}

class QueryResult{
    constructor(result){
        this.original = result;
        this.result = Object.assign({}, result);
        this.id = 'id' in result ? result.id : null;
        this.label = 'label' in result ? result.label : null;
        this.properties = 'properties' in result ? result.properties : {};
        this.changes = {
            'added': [],
            'changed': [],
            'removed': []
        };
    }

    data(){
        let data = Object.assign({}, this.properties);

        if(this.id){
            data['id'] = this.id;
        }

        if(this.label){
            data['label'] = this.label;
        }

        return data;
    }

    change(key, old, value){
        this.changes['changed'].push({key: [old, value]});

        this.properties[key] = value;

        return this;
    }

    add(key, value){
        this.changes['added'].push({key: value});

        this.properties[key] = value;

        return this;
    }

    remove(key, value){
        if(key in this.properties){
            this.changes['removed'].push({key: value});

            delete this.properties[key];
        }

        return this;
    }
}


export default QueryResult;
