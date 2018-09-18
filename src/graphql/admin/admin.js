const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const fs = require('fs');

//const { agenceSchema } = require('./agenceSchema.js');

//var agencesModel = mongoose.model('Configuration', confiSchema);

//module.exports.agencesModel = agencesModel;

module.exports.Admin = `
    type Mutation {
        uploadLogo(file: Upload!): Boolean
    }
`;

module.exports.adminResolvers = {
    Mutation: {
        uploadLogo: async (root, { file }, context ) => {
            const { stream, filename, ...properties } = await file;
            return stream
            .on('error', error => {
                throw error;
            })
            .pipe(fs.createWriteStream("./src/assets/logo.png"))
            .on('error', error => reject(error))
            .on('finish', function(){
                return true;
            });
        },
    },
};