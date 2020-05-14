import { gql } from 'apollo-server';
import books from '../test-data/books';

export const typeDef = gql`
    # Interface type. Useful for types with common fields, which may be
    # returned in a single query result
    interface Book {
        title: String
        author: Author
    }

    type TextBook implements Book {
        title: String
        author: Author
        category: String
    }

    type ColouringBook implements Book {
        title: String
        author: Author
        difficulty: Int
        colour: BookColour
    }

    enum BookColour {
        RED
        BLUE
        PINK
    }

    type Colour {
        name: String
        color: String
    }

    type Query {
        books: [Book]
        colouringBooks(colour: String): ColouringBook
        colours: [Colour] @rest(url: "colours")
    }
`;

export const resolver =  {
    Book: {
        __resolveType(book, context, info) {
            if(book.category) {
                return 'TextBook';
            }
            if(book.difficulty) {
                return 'ColouringBook';
            }
            return null;
        },
    },
    BookColour: {
        RED: '#BF1932',
        BLUE: '#53B0AE',
        PINK: '#C74375',
    },
    Query: {
        books: () => books,
    },
};