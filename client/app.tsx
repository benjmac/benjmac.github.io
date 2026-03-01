import React from 'react';

import {MenuStackable, ChatWidget} from './components';
import {ContentContextProvider} from './state/content';
import {ChatRuntimeProvider} from './state/chat-runtime';
import Routes from './routes';

import './styles/app.scss';

const App = () => {
  return (
    <ChatRuntimeProvider>
      <div className="app-container">
        <ContentContextProvider>
          <MenuStackable />
          <div className="content-body">
            <Routes />
          </div>
          <ChatWidget />
        </ContentContextProvider>
      </div>
    </ChatRuntimeProvider>
  );
};

export default App;
