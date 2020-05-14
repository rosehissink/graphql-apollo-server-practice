import { gql } from 'apollo-server';
import authors from '../test-data/authors';

export const typeDef = gql`
    type Author {
        name: String @lower
        books: [Book]
    }

    extend type Query {
        authors: [Author]
    }
`;

export const resolver =  {
    Query: {
        authors: () => authors,
    },
};