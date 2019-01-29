import * as React from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";

const UPDATE_CURRENT_COUNTER = gql`
  mutation updateCurrentCounter($type: string!) {
    changeValue(type: $type) @client
  }
`;

class UpdateCurrentCounterMutation extends Mutation<{ changeValue: number }> {}

const pattern = [
  {
    type: "+",
    label: "increase"
  },
  {
    type: "-",
    label: "decrease"
  }
];

export const Buttons: React.FC = () => (
  <>
    {pattern.map(({ type, label }) => (
      <UpdateCurrentCounterMutation
        mutation={UPDATE_CURRENT_COUNTER}
        variables={{ type }}
      >
        {(update, { loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          return <button onClick={() => update()}>{label}</button>;
        }}
      </UpdateCurrentCounterMutation>
    ))}
  </>
);
