import React from 'react';
import ReactDOM from 'react-dom';
import {ApolloProvider, useQuery} from '@apollo/react-hooks';
import App from './App'
import gql from 'graphql-tag'
import {WebSocketLink} from 'apollo-link-ws';
import { split } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
// it allows us to make request to server like post and get
import { getMainDefinition } from 'apollo-utilities';
import Login from './Pages/Login'
import {typeDefs,resolvers} from './schema';

const wsLink = new WebSocketLink({
  uri : "ws://localhost:4000/graphql",
  options:{
    reconnect:true
  }
})

const cache = new InMemoryCache();
const httpLink  = new HttpLink({
  uri : "http://localhost:4000/graphql",
  headers: {
    authorization: localStorage.getItem('token'),
  },
})

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  cache,
  link,
  typeDefs,
  resolvers,
})

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

function IsLoggedIn() {
  const { data } = useQuery(IS_LOGGED_IN);
  return data.isLoggedIn ? <App /> : <Login />;
}

cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem('token'),
  },
});

ReactDOM.render(
  <ApolloProvider client={client}>
     {/* <App/> */}
     <IsLoggedIn/>
  </ApolloProvider>,document.getElementById('root')
);
