import React from 'react';
import { useChat } from 'context';
import { ChatAvatar } from 'components';
import { Icon } from 'semantic-ui-react';
import { otherUsers, chatTitles } from 'utils';

export const ChatList = () => {
  const {
    myChats,
    chatConfig,
    selectedChat,
    selectChatClick,
    deleteChatClick,
  } = useChat();
  return (
    <div className="chat-list">
      {myChats.map((c, index) => (
        <div
          className={`chat-list-item ${
            selectedChat?.id === c.id ? 'selected-chat-item' : ''
          }`}
          key={index}
        >
          <div
            onClick={() => selectChatClick(c)}
            className="chat-list-item-content"
          >
            {c.people.length === 1 ? (
              <>
                <div>
                  <Icon circular inverted color="violet" name="user cancel" />
                </div>
                <div className="chat-list-preview">
                  <div className="preview-username">{chatTitles(c.title)}</div>
                </div>
              </>
            ) : c.people.length === 2 ? (
              <>
                <div>
                  <ChatAvatar username={otherUsers(chatConfig, c)} chat={c} />
                </div>
                <div className="chat-list-preview">
                  <div className="preview-username">{chatTitles(c.title)}</div>
                  <div className="preview-message">
                    {c.last_message.attachments.length
                      ? `${c.last_message.sender.username} sent an attachment`
                      : c.last_message.text.slice(0, 50) + '...'}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <Icon circular inverted color="brown" name="users" />
                </div>
                <div className="chat-list-preview">
                  <div className="preview-username">{chatTitles(c.title)}</div>
                  <div className="preview-message">
                    {c.last_message.attachments.length
                      ? `${c.last_message.sender.username} sent an attachment`
                      : `${
                          c.last_message.sender.username
                        } : ${c.last_message.text.slice(0, 50)}...`}
                  </div>
                </div>
              </>
            )}
          </div>

          <div onClick={() => deleteChatClick(c)} className="chat-item-delete">
            <Icon name="delete" />
          </div>
        </div>
      ))}
    </div>
  );
};
