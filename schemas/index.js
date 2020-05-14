import { makeExecutableSchema } from 'graphql-tools';

import LowerCaseDirective, { typeDef as lowercaseDirective } from './directives/lowercaseDirective';
import RestDirective, { typeDef as restDirective} from './directives/restDirective';

import { typeDef as bookSchema, resolver as bookResolver } from './book';
import { typeDef as authorSchema, resolver as authorResolver } from './author';
import { typeDef as searchSchema, resolver as searchResolver } from './search';
import { typeDef as userSchema, resolver as userResolver } from './user';

export default makeExecutableSchema({
    typeDefs: [
        lowercaseDirective,
        restDirective,
        bookSchema,
        authorSchema,
        searchSchema,
        userSchema,
    ],
    resolvers: [
        bookResolver,
        authorResolver,
        searchResolver,
        userResolver,
    ],
    schemaDirectives: {
        lower: LowerCaseDirective,
        lowerCase: LowerCaseDirective,
        rest: RestDirective,
    },
})