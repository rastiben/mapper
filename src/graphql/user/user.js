const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { userSchema } = require('./userSchema.js');

var usersModel = mongoose.model('Users', userSchema);

module.exports.usersModel = usersModel;

module.exports.User = `
    type Query {
        currentUser: User
    }

    type Mutation{
        login(email: String!, password: String!): User
        logout: Boolean
    }

    type User {
        _id: ObjectId
        email: String
    }
`;

module.exports.userResolvers = {
    Query: {
        currentUser: (root, args, { req }) => {
            return req.session.user;
        },
    },
    Mutation: {
        login: (root, { email, password }, { req } ) => {
            req.session.user = { 
                "_id" : mongoose.Types.ObjectId("5551561dgsf6"),
                "email" : "benoit.rastier@gmail.com"
            };

            return req.session.user;
        },
        logout: (root, { email, password }, { req } ) => {
            req.session.user = undefined;

            return true;
        }
    }
};