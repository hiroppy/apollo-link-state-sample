import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { client } from './client';
import { Top } from './components/page';

const root = document.createElement('div');

root.setAttribute('id', 'root');
document.body.append(root);

const render = (Component: typeof Top) => {
  ReactDOM.render(
    <ApolloProvider client={client}>
      <Component />
    </ApolloProvider>,
    document.getElementById('root')
  );
};

render(Top);

if (module.hot) {
  module.hot.accept('./components/page', () => {
    const { Top: TopComponent }: { Top: typeof Top } = require('./components/page');

    render(TopComponent);
  });
}