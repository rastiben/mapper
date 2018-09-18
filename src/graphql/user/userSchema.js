const mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

module.exports.userSchema = new Schema({
    _id: ObjectId,
    username: String,
    password: String,
    admin: Boolean,
    agence: String,
    Conducteur: String,
    created: Date,
    updated: Date
},{ 
    collection : 'users' 
});