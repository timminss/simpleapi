const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

// Custom Schema Types
const userType = require('./types/user');

// Services
const userService = require('../services/user');

const rootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        user:{
            type:userType,
            args:{
                id: {type:GraphQLInt}
            },
            resolve(parentValue, args){
              return userService.getUserById(args.id);
            }
        },
        users:{
            type: new GraphQLList(userType),
            resolve(parentValue, args){
                return userService.getUsers();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: rootQuery
});
