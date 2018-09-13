const express = require('express');
const bodyParser = require('body-parser');
var session = require('express-session');
var cors = require('cors');
var { makeExecutableSchema } = require('graphql-tools');
const { ApolloServer, graphiqlExpress } = require('apollo-server-express');
var { typeDefs, resolvers } = require('./src/graphql/schema.js');

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

//const bcrypt = require('bcrypt');
//var session = require('express-session');
//const uuidv1 = require('uuid/v1');
//var cors = require('cors');

mongoose.connect('mongodb://localhost:27017/local', { useNewUrlParser: true });

const executableSchema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

const server =  new ApolloServer({
    schema: executableSchema,
    context: async ({req}) => {
        return {
            req: req
        }
    }
  });

var app = express();

var sess = {
    secret: 'keyboard cat',
    cookie: {}
}

if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess));
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);