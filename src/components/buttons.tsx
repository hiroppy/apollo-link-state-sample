import * as React from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

const INCREASE_CURRENT_COUNTER = gql`
  mutation increase($type: string! = "+") {
   changeValue(type: $type) @client
  }
`;

const DECREASE_CURRENT_COUNTER = gql`
  mutation decrease($type: String! = "-") {
    changeValue(type: $type) @client
  }
`;

class IncreaseCurrentCounterMutation extends Mutation<{ changeValue: number }>{}
class DecreaseCurrentCounterMutation extends Mutation<{ changeValue: number }>{}

export const Buttons: React.FC = () => (
  <>
    <IncreaseCurrentCounterMutation mutation={INCREASE_CURRENT_COUNTER}>
      {(increase, { loading, error, data }) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;

        return <button onClick={() => increase()}>increase</button>
      }}
    </IncreaseCurrentCounterMutation>
    <DecreaseCurrentCounterMutation mutation={DECREASE_CURRENT_COUNTER}>
      {(decrease, { loading, error, data }) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;

        return <button onClick={() => decrease()}>decrease</button>
      }}
    </DecreaseCurrentCounterMutation>
  </>
)