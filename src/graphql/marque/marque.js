const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { marqueSchema } = require('./marqueSchema.js');

var marquesModel = mongoose.model('Marques', marqueSchema);

module.exports.marquesModel = marquesModel;

module.exports.Marque = `
    type Query {
        marques: [Marque]
    }

    type Mutation {
        addMarque(input: MarqueInput!): Marque
        updateMarque(_id: String!, input: MarqueInput!): Marque
        removeMarque(_id: String!): Marque
    }

    type Marque {
        _id: ObjectId
        marque: String
        color: String
    }

    input MarqueInput {
        marque: String
        color: String
    }
`;

module.exports.marqueResolvers = {
    Query: {
        marques: (root, args, context) => {
            return marquesModel.find({})
            .then(marques => {
                return marques;
            })
        },
    },
    Mutation: {
        addMarque: (root, { input }, context ) => {
            var marque = new marquesModel({
                _id: new mongoose.Types.ObjectId(),
                ...input
            });

            return marque.save()
            .then(marque => {
                return marque;
            })
        },
        updateMarque: (root, { _id, input }, context ) => {
            
            var query = {'_id': mongoose.Types.ObjectId(_id)};

            return marquesModel.findOneAndUpdate(query, input , {}, function(err, marque){
                if (err) return res.send(500, { error: err });
                return marque;
            });
        },
        removeMarque: (root, { _id }, context ) => {

            var query = {'_id': mongoose.Types.ObjectId(_id)};

            const removedMarque = marquesModel.findByIdAndRemove(query).exec();

            if (!removedMarque) {
                throw new Error('Error')
            }

            return removedMarque;
        }
    },
};