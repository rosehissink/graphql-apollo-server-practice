import { gql, SchemaDirectiveVisitor } from 'apollo-server';
import { defaultFieldResolver } from 'graphql';

export const typeDef = gql`
    directive @lower on FIELD_DEFINITION
`;

class LowerCaseDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field) {
        const { resolve = defaultFieldResolver } = field;
        field.resolve = async function (...args) {

            const result = await resolve.apply(this, args);

            if (typeof result === "string") {
                return result.toLowerCase();
            }
            return result;
        };
    }
}

export default LowerCaseDirective;