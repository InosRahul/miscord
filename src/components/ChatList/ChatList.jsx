import { ChatAvatar } from 'components/ChatAvatar/ChatAvatar';
import { useChat } from 'context/ChatContext';
import { Icon } from 'semantic-ui-react';
import { joinUserName, otherUser } from 'utils';

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
      {myChats.map((curr, index) => (
        <div
          className={`chat-list-item ${
            selectedChat?.id === curr.id ? 'selected-chat-item' : ''
          }`}
          key={index}
        >
          <div
            onClick={() => selectChatClick(curr)}
            className="chat-list-item-content"
          >
            {curr.people.length === 1 ? (
              <>
                <Icon
                  circular
                  inverted
                  color="violet"
                  name="user cancel"
                ></Icon>
                <div className="chat-list-preview">
                  <div className="preview-username">No One Added Yet</div>
                </div>
              </>
            ) : curr.people.length === 2 ? (
              <>
                <ChatAvatar
                  username={otherUser(chatConfig, curr)}
                  chat={curr}
                />
                <div className="chat-list-preview">
                  <div className="preview-username">
                    {otherUser(chatConfig, curr)}
                  </div>
                  <div className="preview-message">
                    {curr.last_message.attachments.length
                      ? `${curr.last_message.sender.username} sent an attachment`
                      : curr.last_message.text.slice(0, 50) + '...'}
                  </div>
                </div>
              </>
            ) : (
              <>
                <Icon circular inverted color="brown" name="users"></Icon>
                <div className="chat-list-preview">
                  <div className="preview-username">
                    {joinUserName(curr.people, chatConfig.userName)}
                  </div>
                  <div className="preview-message">
                    {curr.last_message.attachments.length
                      ? `${curr.last_message.sender.username} sent an attachment`
                      : curr.last_message.text.slice(0, 50) + '...'}
                  </div>
                </div>
              </>
            )}
          </div>

          <div
            onClick={() => deleteChatClick(curr)}
            className="chat-item-delete"
          >
            <Icon name="delete" />
          </div>
        </div>
      ))}
    </div>
  );
};
