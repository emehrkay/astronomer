class Query{
    constructor(QueryResult, graph_variable = 'g'){
        this.query_result = QueryResult;
        this.graph_variable = graph_variable;
    }

    toString(){
        let parts = [this.graph_variable],
            changes = this.query_result.changes;

        return parts.join('');
    }
}
