import { gql, SchemaDirectiveVisitor } from 'apollo-server';
import { GraphQLScalarType, GraphQLNonNull } from 'graphql';

export const typeDefs = gql`
  directive @length(max: Int) on FIELD_DEFINITION | INPUT_FIELD_DEFINITION
`;

class LengthDirective extends SchemaDirectiveVisitor {
  visitInputFieldDefinition(field) {
    this.wrapType(field);
  }

  visitFieldDefinition(field) {
    this.wrapType(field);
  }

  // Replace field.type with a custom GraphQLScalarType that enforces the
  // length restriction.
  wrapType(field) {
    if (
      field.type instanceof GraphQLNonNull &&
      field.type.ofType instanceof GraphQLScalarType
    ) {
      field.type = new GraphQLNonNull(
        new LimitedLengthType(field.type.ofType, this.args.max),
      );
    } else if (field.type instanceof GraphQLScalarType) {
      field.type = new LimitedLengthType(field.type, this.args.max);
    } else {
      throw new Error(`Not a scalar type: ${field.type}`);
    }
  }
}

// Custom Scalar type to enforce length limit in fields
export class LimitedLengthType extends GraphQLScalarType {
    constructor(type, maxLength) {
        super({
            name: `LengthAtMost${maxLength}`,

            serialize(value) {
              value = type.serialize(value);
              value = value.substring(0, maxLength - 1);
              return value;
            },

            parseValue(value) {
              return type.parseValue(value);
            },

            parseLiteral(ast) {
              return type.parseLiteral(ast);
            },
        });
    }
}

export default LengthDirective;