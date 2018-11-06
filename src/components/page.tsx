import * as React from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Button } from './buttons';
import { author as Author, counter as Counter } from '../state';

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

export const Top = () => (
  <>
    { console.log('Top: rendering') }
    <Query query={GET_AUTHOR}>
      {({ loading, error, data }) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;

        const { user }: { user: typeof Author } = data;

        return (
          <>
            <h3>Author</h3>
            <p>{user.name}</p>
            <p>{user.bio}</p>
            <Icon src={user.avatarUrl} />
          </>
        );
      }}
    </Query>
    <Query query={GET_CURRENT_COUNTER}>
      {({ loading, error, data }) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;

        const { counter }: { counter: typeof Counter } = data;

        return <p>{counter.current}</p>;
      }}
    </Query>
    <Button />
  </>
);
