require('dotenv').config();

const express = require('express'),
    cors = require('cors'),
    body_parser = require('body-parser'),
    gremlin = require('./model');


const app = express(),
    port = process.env.port || 9911;


app.use(cors());
app.use(body_parser.json());
app.use(body_parser.urlencoded({
    extended: true
}));


app.get('/', (req, res) => {
    res.send('hi')
})

app.post('/query', async (req, res) => {
    let r = await gremlin.query(req.body.query);

    res.json(r);
});


app.listen(port, function(){
    console.log('astronomer server is listening on: ' + port);
});