'use client';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Account2, ViewAccount, AddCard } from './components';
import { AddItem } from './AddItem';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { Provider } from 'react-redux';
import store from '@/store';
import { useState } from 'react';

export default function Home() {
  const [env, setEnv] = useState('');
  const client = new ApolloClient({
    uri: `https://api${env}.gateway.seoltab.com/graphql`,

    cache: new InMemoryCache(),
  });
  let [viewList, setViewList] = useState(false);
  const [currentEmail, setCurrentEmail] = useState('');
  const [currentUserId, setCurrentUserId] = useState('');
  const [adminToken, setAdminToken] = useState('');

  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <div>
          {/* 계정 생성 영역 */}
          <div className="container">
            <div
              className="big-area"
              style={{
                border: '2px solid black',
                borderRadius: '5px',
                width: '50%',
              }}
            >
              <Account2
                setViewList={setViewList}
                setCurrentEmail={setCurrentEmail}
                setCurrentUserId={setCurrentUserId}
                setEnv={setEnv}
              />
            </div>
            {/* 계정 목록 영역 */}
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
          {/* 카드 등록 영역 */}
          <AddCard
            currentEmail={currentEmail}
            currentUserId={currentUserId}
            adminToken={adminToken}
            setAdminToken={setAdminToken}
          />
          {/* 상품 결제 영역 */}

          <AddItem currentUserId={currentUserId} adminToken={adminToken} />
        </div>
      </ApolloProvider>
    </Provider>
  );
}
