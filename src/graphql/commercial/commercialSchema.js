const mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

module.exports.commercialSchema = new Schema({
    _id: ObjectId,
    commercial: String,
},{ 
    collection : 'commerciaux' 
});