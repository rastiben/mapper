const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { userSchema } = require('./userSchema.js');

var usersModel = mongoose.model('Users', userSchema);

module.exports.usersModel = usersModel;

module.exports.User = `
    type Query {
        currentUser: User
        users: [User]
    }

    type Mutation{
        login(username: String!, password: String!): User
        logout: Boolean
        removeUser(_id: String!): User
        addUser(input: UserInput!) : User
        updateUser(_id: String!, input: UserInput!) : User
    }

    type User {
        _id: ObjectId
        username: String,
        password: String,
        admin: Boolean,
        agence: String,
        conducteur: String,
        created: Date,
        updated: Date
    }

    input UserInput {
        username: String,
        password: String,
        admin: Boolean,
        agence: String,
        conducteur: String,
        created: Date,
        updated: Date
    }
`;

module.exports.userResolvers = {
    Query: {
        currentUser: (root, args, { req }) => {
            return req.session.user;
        },
        users: (root, args, { req }) => {
            return usersModel.find({})
            .then(users => {
                return users;
            })
        },
    },
    Mutation: {
        login: (root, { username, password }, { req } ) => {

            return usersModel.findOne({username : username})
            .then(user => {
                if(user != null){

                    return bcrypt.compare(password, user.password)
                    .then(function(res) {

                        if(res)
                            req.session.user = user._id;
                        
                        return req.session.user;

                    });

                }
            });
        },
        logout: (root, { email, password }, { req } ) => {
            req.session.user = undefined;

            return true;
        },
        addUser: async (root, { input }, context ) => {

            const password = await bcrypt.hash(input.password, 10);

            var user = new usersModel({
                ...input,
                _id: new mongoose.Types.ObjectId(),
                created: new Date(),
                updated: new Date(),
                password: password
            });

            return user.save()
            .then(user => {
                return user;
            })
        },
        updateUser: async (root, { _id, input }, context ) => {
            var query = {'_id': mongoose.Types.ObjectId(_id)};

            var update = {
                ...input,
                updated: new Date()
            };

            if(input.password){
                const password = await bcrypt.hash(input.password, 10);

                var update = {
                    ...update,
                    password: password
                };
            }

            return usersModel.findOneAndUpdate(query, update , {}, function(err, user){
                if (err) return res.send(500, { error: err });
                return user;
            });
        },
        removeUser: (root, { _id }, context ) => {

            var query = {'_id': mongoose.Types.ObjectId(_id)};

            const removedUser = usersModel.findByIdAndRemove(query).exec();

            if (!removedUser) {
                throw new Error('Error')
            }

            return removedUser;
        }
    }
};