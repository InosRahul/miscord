import { useChat } from 'context';
import { ChatAvatar } from 'components';
import { groupMessages, formatDateTime } from 'utils';
import { useScrollToBottom } from 'hooks';

export const MessageList = () => {
  const { selectedChat } = useChat();
  useScrollToBottom(selectedChat, 'chat-messages');

  return (
    <div className="chat-messages">
      {!!selectedChat.messages.length ? (
        groupMessages(selectedChat.messages).map((m, index) => (
          <div key={index} className="chat-message">
            <div className="chat-message-header">
              <ChatAvatar
                className="message-avatar"
                username={m[0].sender.username}
                chat={selectedChat}
              />
              <div className="message-author">
                {m[0].sender.username}
                <span>{formatDateTime.formatDate(m[0].created)}</span>
              </div>
            </div>

            <div className="message-content">
              {m.map((individualMessage, index) => (
                <div key={index}>
                  {!individualMessage.attachments.length ? (
                    <div className="message-text">
                      {individualMessage.text}
                      <div className="time-text">
                        {formatDateTime.formatTime(individualMessage.created)}
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}

                  {!!individualMessage.attachments.length && (
                    <>
                      <div className="message-text">
                        <img
                          className="message-image"
                          src={individualMessage.attachments[0].file}
                          alt={individualMessage.id + '-attachment'}
                        />
                        <div className="time-text">
                          {formatDateTime.formatTime(individualMessage.created)}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="no-messages-yet">No messages yet</div>
      )}
    </div>
  );
};
