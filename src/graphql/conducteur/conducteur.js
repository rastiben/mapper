const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { conducteurSchema } = require('./conducteurSchema.js');

var conducteursModel = mongoose.model('Conducteurs', conducteurSchema);

module.exports.conducteursModel = conducteursModel;

module.exports.Conducteur = `
    type Query {
        conducteurs: [Conducteur]
    }

    type Mutation {
        addConducteur(input: ConducteurInput!): Conducteur
        updateConducteur(_id: String!, input: ConducteurInput!): Conducteur
        removeConducteur(_id: String!): Conducteur
    }

    type Conducteur {
        _id: ObjectId
        conducteur: String
    }

    input ConducteurInput {
        conducteur: String
    }
`;

module.exports.conducteurResolvers = {
    Query: {
        conducteurs: (root, args, context) => {
            return conducteursModel.find({})
            .then(conducteurs => {
                return conducteurs;
            })
        },
    },
    Mutation: {
        addConducteur: (root, { input }, context ) => {
            var conducteur = new conducteursModel({
                _id: new mongoose.Types.ObjectId(),
                ...input
            });

            return conducteur.save()
            .then(conducteur => {
                return conducteur;
            })
        },
        updateConducteur: (root, { _id, input }, context ) => {
            
            var query = {'_id': mongoose.Types.ObjectId(_id)};

            return conducteursModel.findOneAndUpdate(query, input , {}, function(err, conducteur){
                if (err) return res.send(500, { error: err });
                return conducteur;
            });
        },
        removeConducteur: (root, { _id }, context ) => {

            var query = {'_id': mongoose.Types.ObjectId(_id)};

            const removedConducteur = conducteursModel.findByIdAndRemove(query).exec();

            if (!removedConducteur) {
                throw new Error('Error')
            }

            return removedConducteur;
        }
    },
};