require('dotenv').config();

const gremlin = require('gremlin'),
    client = gremlin.createClient();
    

const makePromise = (client, query) => {
    const promise = new Promise((resolve, reject) =>
        client.execute(query, (err, results) =>
            err ? reject(err) : resolve(results)
        )
    );

    // Let's attach the query for easier debugging
    promise.query = query;

    return promise;
}

const query = async (query) => {
    let g = makePromise(client, query)
    const resp = await g;

    return resp;
};

module.exports = {
    'gremlin': gremlin,
    'query': query,
};
