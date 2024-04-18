'use client';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Account2 } from './components';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { Provider } from 'react-redux';
import store from '@/store';

export default function Home() {
  const client = new ApolloClient({
    uri: 'https://api.dev.gateway.seoltab.com/graphql',

    cache: new InMemoryCache(),
  });
  return (
    <Provider store={store}>
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
            <Account2 />
          </div>
          <div
            className="big-area"
            style={{
              border: '2px solid black',
              borderRadius: '5px',
              width: '50%',
            }}
          ></div>
          <div>Hello</div>
        </div>
      </ApolloProvider>
    </Provider>
  );
}
