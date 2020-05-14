import { gql } from 'apollo-server';

export const typeDef = gql`
    type User {
        id: Int,
        email: String,
        firstName: String,
        lastName: String,
    }

    extend type Query {
        users: [User] @rest(url: "users")
    }
`;

export const resolver =  {
    Query: {
        users: (parent) => console.log(parent),
    },
};