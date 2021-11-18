import React, { useState } from 'react';
import { useChat } from 'context';
import { useResolved } from 'hooks';
import { ChatList, Header } from 'components';
import { Loader } from 'semantic-ui-react';
import { Icon } from 'semantic-ui-react';

export const LeftSidebar = () => {
  const { myChats, createChatClick } = useChat();
  const chatsResolved = useResolved(myChats);
  const [showHide, setShowHide] = useState(false);
  const [chatTitle, setChatTitle] = useState('');

  const createChat = chatTitle => {
    createChatClick(chatTitle);
    setShowHide(!showHide);
    setChatTitle('');
  };
  const createChatEnter = event => {
    if (event.key === 'Enter') {
      return createChat(event.target.value);
    }
  };
  return (
    <div className="left-rail">
      <Header />
      {chatsResolved ? (
        <>
          {!!showHide && (
            <div>
              <input
                value={chatTitle}
                className="chat-title-input"
                type="text"
                minLength="5"
                maxLength="40"
                autoFocus
                onInput={e => setChatTitle(e.target.value)}
                placeholder="Set Chat Title - Min 6 characters"
                onKeyDown={createChatEnter}
              ></input>
              <span onClick={() => setShowHide(!showHide)}>
                <Icon name="delete" />
              </span>
              <button
                className="create-chat-title-button"
                disabled={chatTitle.trim().length < 6 ? true : false}
                onClick={() => createChat(chatTitle)}
              >
                Create chat
              </button>
            </div>
          )}
          {!!myChats.length ? (
            <div className="chat-list-container">
              <ChatList />
            </div>
          ) : (
            <div className="chat-list-container no-chats-yet">
              <h3>No Chats Yet</h3>
            </div>
          )}
          <button
            className="create-chat-button"
            onClick={() => setShowHide(true)}
          >
            {' '}
            Create New Chat{' '}
          </button>
        </>
      ) : (
        <div className="chats-loading">
          <Loader active size="huge"></Loader>
        </div>
      )}
    </div>
  );
};
