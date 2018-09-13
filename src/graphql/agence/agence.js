const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { agenceSchema } = require('./agenceSchema.js');

var agencesModel = mongoose.model('Agences', agenceSchema);

module.exports.agencesModel = agencesModel;

module.exports.Agence = `
    type Query {
        agences: [Agence]
    }

    type Mutation {
        addAgence(input: AgenceInput!): Agence
        updateAgence(_id: String!, input: AgenceInput!): Agence
        removeAgence(_id: String!): Agence
    }

    type Agence {
        _id: ObjectId
        agence: String
    }

    input AgenceInput {
        agence: String
    }
`;

module.exports.agenceResolvers = {
    Query: {
        agences: (root, args, context) => {
            return agencesModel.find({})
            .then(agences => {
                return agences;
            })
        },
    },
    Mutation: {
        addAgence: (root, { input }, context ) => {
            var agence = new agencesModel({
                _id: new mongoose.Types.ObjectId(),
                ...input
            });

            return agence.save()
            .then(agence => {
                return agence;
            })
        },
        updateAgence: (root, { _id, input }, context ) => {
            
            var query = {'_id': mongoose.Types.ObjectId(_id)};

            return agencesModel.findOneAndUpdate(query, input , {}, function(err, agence){
                if (err) return res.send(500, { error: err });
                return agence;
            });
        },
        removeAgence: (root, { _id }, context ) => {

            var query = {'_id': mongoose.Types.ObjectId(_id)};

            const removedAgence = agencesModel.findByIdAndRemove(query).exec();

            if (!removedAgence) {
                throw new Error('Error')
            }

            return removedAgence;
        }
    },
};