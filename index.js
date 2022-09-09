const express = require('express'); // npm install express
const app = express();
const port = 3010;
const path = require('path');
const { buildSchema } = require('graphql'); // npm install graphql
var { graphqlHTTP } = require('express-graphql'); // npm install express-graphql

const schema = buildSchema(`
    type Query {
        title:String
    }
`)

var root = {
    title:'egoing blog',
}

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root
}));

app.get('/', (req, res) => {
    res.sendFile(path.resolve('index.html'));
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
