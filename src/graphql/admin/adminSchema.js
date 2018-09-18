const mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

module.exports.agenceSchema = new Schema({
    _id: ObjectId,
    agence: String,
},{ 
    collection : 'agences' 
});