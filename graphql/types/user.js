const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} = require('graphql');

const userType = new GraphQLObjectType({
    name:'User',
    fields:() => ({
        id: {type:GraphQLInt},
        forename: {type: GraphQLString},
        surname: {type: GraphQLString},
        email: {type: GraphQLString}
    })
});

module.exports = userType;
