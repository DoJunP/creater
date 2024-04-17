'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { Account, Account2 } from './components';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

export default function Home() {
  const client = new ApolloClient({
    uri: 'https://api.dev.gateway.seoltab.com/graphql',
    // uri: 'https://api.dev.auth.seoltab.com/graphql',
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      <div className="container">
        <div
          className="big-area"
          style={{
            border: '2px solid black',
            borderRadius: '5px',
            width: '50%',
          }}
        >
          <Account />
        </div>
        <div
          className="big-area"
          style={{
            border: '2px solid black',
            borderRadius: '5px',
            width: '50%',
          }}
        >
          <Account2 />
        </div>
      </div>
    </ApolloProvider>
  );
}
