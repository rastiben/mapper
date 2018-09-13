const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { commercialSchema } = require('./commercialSchema.js');

var commerciauxModel = mongoose.model('Commerciaux', commercialSchema);

module.exports.commerciauxModel = commerciauxModel;

module.exports.Commercial = `
    type Query {
        commerciaux: [Commercial]
    }

    type Mutation {
        addCommercial(input: CommercialInput!): Commercial
        updateCommercial(_id: String!, input: CommercialInput!): Commercial
        removeCommercial(_id: String!): Commercial
    }

    type Commercial {
        _id: ObjectId
        commercial: String
    }

    input CommercialInput {
        commercial: String
    }
`;

module.exports.commercialResolvers = {
    Query: {
        commerciaux: (root, args, context) => {
            return commerciauxModel.find({})
            .then(commerciaux => {
                return commerciaux;
            })
        },
    },
    Mutation: {
        addCommercial: (root, { input }, context ) => {
            var commercial = new commerciauxModel({
                _id: new mongoose.Types.ObjectId(),
                ...input
            });

            return commercial.save()
            .then(commercial => {
                return commercial;
            })
        },
        updateCommercial: (root, { _id, input }, context ) => {
            
            var query = {'_id': mongoose.Types.ObjectId(_id)};

            return commerciauxModel.findOneAndUpdate(query, input , {}, function(err, commercial){
                if (err) return res.send(500, { error: err });
                return commercial;
            });
        },
        removeCommercial: (root, { _id }, context ) => {

            var query = {'_id': mongoose.Types.ObjectId(_id)};

            const removedCommercial = commerciauxModel.findByIdAndRemove(query).exec();

            if (!removedCommercial) {
                throw new Error('Error')
            }

            return removedCommercial;
        }
    },
};