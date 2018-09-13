const mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

module.exports.avancementSchema = new Schema({
    _id: ObjectId,
    avancement: String,
},{ 
    collection : 'avancements' 
});