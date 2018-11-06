import * as React from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

const INCREASE_CURRENT_COUNTER = gql`
  mutation increase($type: String!) {
   changeValue(type: $type) @client
  }
`;

const DECREASE_CURRENT_COUNTER = gql`
  mutation decrease($type: String!) {
    changeValue(type: $type) @client
  }
`;

function createValue(type: string) {
  return { variables: { type } };
}

export const Button = () => (
  <>
    <Mutation mutation={INCREASE_CURRENT_COUNTER}>
      {(increase, { loading, error, data }) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;

        return <button onClick={() => increase(createValue('+'))}>increase</button>
      }}
    </Mutation>
    <Mutation mutation={DECREASE_CURRENT_COUNTER}>
      {(decrease, { loading, error, data }) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;

        return <button onClick={() => decrease(createValue('-'))}>decrease</button>
      }}
    </Mutation>
  </>
)