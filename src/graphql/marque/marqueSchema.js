const mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

module.exports.marqueSchema = new Schema({
    _id: ObjectId,
    marque: String,
    color: String
},{ 
    collection : 'marques' 
});