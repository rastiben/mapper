const { merge } = require('lodash');
const { makeExecutableSchema } = require('graphql-tools');
const { mergeTypes } = require('merge-graphql-schemas');
const { ObjectId, Date } = require('./scalar.js');

const { 
  Marker,
  markerResolvers
} = require('./marker/marker.js');

const { 
  Avancement,
  avancementResolvers
} = require('./avancement/avancement.js');

const { 
  Agence,
  agenceResolvers
} = require('./agence/agence.js');

const { 
  Commercial,
  commercialResolvers
} = require('./commercial/commercial.js');

const { 
  Conducteur,
  conducteurResolvers
} = require('./conducteur/conducteur.js');

const { 
  Marque,
  marqueResolvers
} = require('./marque/marque.js');

const { 
  User,
  userResolvers
} = require('./user/user.js');

const { 
  Admin,
  adminResolvers
} = require('./admin/admin.js');

//SCALAR
const Scalar = `
  scalar Upload
  scalar ObjectId
  scalar Date
`;

module.exports.typeDefs = mergeTypes([ 
  Scalar, 
  Marker, 
  Avancement,
  Agence,
  Commercial,
  Conducteur,
  Marque,
  User,
  Admin
], 
{ all: true }
);

module.exports.resolvers = merge(
  markerResolvers,
  avancementResolvers,
  agenceResolvers,
  commercialResolvers,
  conducteurResolvers,
  marqueResolvers,
  userResolvers,
  adminResolvers
);