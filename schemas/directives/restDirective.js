import { gql, SchemaDirectiveVisitor }from 'apollo-server';
import axios from 'axios';

export const typeDef = gql`
  directive @rest(url: String) on FIELD_DEFINITION
`;

class RestDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field) {
        const { url } = this.args;
        const fullUrl = `https://reqres.in/api/${url}`;
        console.log(fullUrl);
        field.resolve =  async () => {
            const result = await axios.get(fullUrl);
            console.log(result.data.data);
            return result.data.data || null;
        };
    }
}

export default RestDirective;