const { GraphQLScalarType } = require('graphql/type');

module.exports.ObjectId = new GraphQLScalarType({
    name: 'ObjectId',
    serialize(value) {
      return value.toString();
    },
});

module.exports.Date = new GraphQLScalarType({
  name: 'Date',
  serialize(value) {
    return value.toString();
  },
});