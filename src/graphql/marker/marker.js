const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { markerSchema } = require('./markerSchema.js');
const { agencesModel } = require('../agence/agence.js');
const { avancementsModel } = require('../avancement/avancement.js');
const { commerciauxModel } = require('../commercial/commercial.js');
const { conducteursModel } = require('../conducteur/conducteur.js');
const { marquesModel } = require('../marque/marque.js');

var markerModel = mongoose.model('Markers', markerSchema);

module.exports.Marker = `
    type Query {
        markers: [Marker]
    }

    type Mutation {
        addMarker(input: MarkerInput!): Marker
        updateMarker(_id: String!, input: MarkerInput!): Marker
    }

    type Marker {
        _id: ObjectId
        lat: Float
        lng: Float
        signature: String
        confirmation: String
        agence: String
        commercial: String
        marque: String
        client: String
        lieu: String
        montantttc: Float
        montantht: Float
        conducteur: String
        avancement: String
        ouverture: String
        livraison: String
        dispo: Int
    }

    input MarkerInput {
        lat: Float
        lng: Float
        signature: String
        confirmation: String
        agence: String
        commercial: String
        marque: String
        client: String
        lieu: String
        montantttc: Float
        montantht: Float
        conducteur: String
        avancement: String
        ouverture: String
        livraison: String
        dispo: Int
    }
`;

module.exports.markerResolvers = {
    Query: {
        markers: (root, args, context) => {
            return markerModel.find({})
            .then(markers => {
                return markers;
            })
        },
    },
    Mutation: {
        addMarker: (root, { input }, context ) => {
            var marker = new markerModel({
                _id: new mongoose.Types.ObjectId(),
                ...input
            });

            return marker.save()
            .then(marker => {
                return marker;
            })
        },
        updateMarker: (root, { _id, input }, context ) => {
            
            var query = {'_id': mongoose.Types.ObjectId(_id)};

            return markerModel.findOneAndUpdate(query, input , {}, function(err, marker){
                if (err) return res.send(500, { error: err });
                return marker;
            });
        }
    },  
};