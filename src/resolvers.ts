import { gql } from 'apollo-boost';
import { IResolvers } from 'graphql-tools';

export const resolvers: IResolvers = {
  Mutation: {
    changeValue: (_, variables, { cache }) => {
      const query = gql`
        query {
          counter {
            current
          }
        }
      `;

      const prev = cache.readQuery({ query });
      const current = variables.type === '+' ?
        ++prev.counter.current :
        --prev.counter.current;

      cache.writeData({ query, data: { current } });

      return current;
    }
  }
}
