import { gql } from 'apollo-server';
import authors from '../test-data/authors';
import books from '../test-data/books';

export const typeDef = gql`
    # Union type. Union types can't contain Interfaces
    union SearchResult = TextBook | ColouringBook | Author

    extend type Query {
        search(contains: String): [SearchResult]
    }
`;

export const resolver =  {
    SearchResult: {
        __resolveType(obj, context, info) {
            if(obj.name) {
                return 'Author';
            }
            if(obj.category) {
                return 'TextBook';
            }
            if(obj.difficulty) {
                return 'ColouringBook';
            }
            return null;
        }
    },
    Query: {
        search: (parent, args) => {
            let results = [];

            results = results.concat(
                books.filter(
                    ({ title }) => title.toLowerCase().includes(args.contains.toLowerCase())
                )
            );
            results = results.concat(
                authors.filter(
                    ({ name }) => name.toLowerCase().includes(args.contains.toLowerCase())
                )
            );

            return results;
        },
    },
};