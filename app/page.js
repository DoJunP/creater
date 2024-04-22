'use client';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Account2, ViewAccount } from './components';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { Provider } from 'react-redux';
import store from '@/store';
import { useState } from 'react';

export default function Home() {
  const client = new ApolloClient({
    uri: 'https://api.dev.gateway.seoltab.com/graphql',

    cache: new InMemoryCache(),
  });
  let [viewList, setViewList] = useState(false);

  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <div>
          <div className="container">
            <div
              className="big-area"
              style={{
                border: '2px solid black',
                borderRadius: '5px',
                width: '50%',
              }}
            >
              <Account2 setViewList={setViewList} />
            </div>
            <div
              className="big-area"
              style={{
                border: '2px solid black',
                borderRadius: '5px',
                width: '50%',
              }}
            >
              <ViewAccount viewList={viewList} />
            </div>
          </div>
          <div className="container">
            <div>카드 등록 영역</div>
          </div>
          <div className="container">
            <div>상품 결제 영역</div>
          </div>
        </div>
      </ApolloProvider>
    </Provider>
  );
}
