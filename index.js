const express = require('express'); // npm install express
const app = express();
const port = 3010;
const path = require('path');
const { buildSchema } = require('graphql'); // npm install graphql
var { graphqlHTTP } = require('express-graphql'); // npm install express-graphql

const schema = buildSchema(`
    type Topic{
        id:Int
        title:String
        body:String
    }
    type Query {
        title:String
        topics:[Topic]
        getTopic(id: Int):Topic
    }
`)

const topics = [
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
    {id:3, title:'js', body:'js is ...'}
]

const getTopic = function(args){
    const id = args.id;
    const topic = topics.find(topic=>topic.id === id);
    for(let i=0; i<topics.length; i++){
      if(topics[i].id === id){
        return topics[i]
      }
    }
    return null;
}

var root = {
    title:'egoing blog',
    topics:topics,
    getTopic:getTopic
}

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

app.get('/', (req, res) => {
    res.sendFile(path.resolve('index.html'));
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
