import * as React from "react";
import styled from "styled-components";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import { Buttons } from "./buttons";
import { author as Author, counter as Counter } from "../state";

const GET_AUTHOR = gql`
  query {
    user(login: "hiroppy") {
      name
      avatarUrl
      bio
    }
  }
`;

const GET_CURRENT_COUNTER = gql`
  query {
    counter @client {
      current
    }
  }
`;

const Icon = styled.img`
  border-radius: 50%;
  height: 120px;
  width: 120px;
`;

class GetAuthorQuery extends Query<{ user: typeof Author }> {}
class GetCurrentCounterQuery extends Query<{ counter: typeof Counter }> {}

export const Top: React.FC = () => (
  <>
    {console.log("Top: rendering")}
    <GetAuthorQuery query={GET_AUTHOR}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;
        if (!data) return `Error! data is undefined`;

        const { user } = data;

        return (
          <>
            <h3>Author</h3>
            <p>{user.name}</p>
            <p>{user.bio}</p>
            <Icon src={user.avatarUrl} />
          </>
        );
      }}
    </GetAuthorQuery>
    <GetCurrentCounterQuery query={GET_CURRENT_COUNTER}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;
        if (!data) return `Error! data is undefined`;

        return <p>{data.counter.current}</p>;
      }}
    </GetCurrentCounterQuery>
    <Buttons />
  </>
);
