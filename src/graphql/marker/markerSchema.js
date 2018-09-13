const mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

module.exports.markerSchema = new Schema({
    _id: ObjectId,
    id: String,
    lat: Number,
    lng: Number,
    signature: String,
    confirmation: String,
    agence: String,
    commerciale: String,
    marque: String,
    client: String,
    lieu: String,
    montantttc: Number,
    montantht: Number,
    conducteur: String,
    avancement: String,
    ouverture: String,
    livraison: String,
    dispo: Number
},{ 
    collection : 'markers' 
});