const mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

module.exports.conducteurSchema = new Schema({
    _id: ObjectId,
    conducteur: String,
},{ 
    collection : 'conducteurs' 
});