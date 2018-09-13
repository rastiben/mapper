const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { avancementSchema } = require('./avancementSchema.js');

var avancementsModel = mongoose.model('Avancements', avancementSchema);

module.exports.avancementsModel = avancementsModel;

module.exports.Avancement = `
    type Query {
        avancements: [Avancement]
    }

    type Mutation {
        addAvancement(input: AvancementInput!): Avancement
        updateAvancement(_id: String!, input: AvancementInput!): Avancement
        removeAvancement(_id: String!): Avancement
    }

    type Avancement {
        _id: ObjectId
        avancement: String
    }

    input AvancementInput {
        avancement: String
    }
`;

module.exports.avancementResolvers = {
    Query: {
        avancements: (root, args, context) => {
            return avancementsModel.find({})
            .then(avancements => {
                return avancements;
            })
        },
    },    
    Mutation: {
        addAvancement: (root, { input }, context ) => {
            var avancement = new avancementsModel({
                _id: new mongoose.Types.ObjectId(),
                ...input
            });

            return avancement.save()
            .then(avancement => {
                return avancement;
            })
        },
        updateAvancement: (root, { _id, input }, context ) => {
            
            var query = {'_id': mongoose.Types.ObjectId(_id)};

            return avancementsModel.findOneAndUpdate(query, input , {}, function(err, avancement){
                if (err) return res.send(500, { error: err });
                return avancement;
            });
        },
        removeAvancement: (root, { _id }, context ) => {

            var query = {'_id': mongoose.Types.ObjectId(_id)};

            const removedAvancement = avancementsModel.findByIdAndRemove(query).exec();

            if (!removedAvancement) {
                throw new Error('Error')
            }

            return removedAvancement;
        }
    }, 
};