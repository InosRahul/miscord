import { useState } from 'react';
import { useChat } from 'context';
import { joinUserName, chatTitles } from 'utils';
import { Icon } from 'semantic-ui-react';
import { SearchUsers } from 'components';

export const ChatToolbar = () => {
  const { selectedChat, chatConfig } = useChat();
  const [searching, setSearching] = useState(false);

  return (
    <>
      <div className="chat-toolbar">
        <div className="chat-header-text">
          {chatTitles(selectedChat.title)}
          {' - '}
          {joinUserName(selectedChat.people, chatConfig.userName).slice(0, 100)}
        </div>

        <div className="add-user-icon">
          <Icon
            color="grey"
            name="user plus"
            onClick={() => setSearching(true)}
          />
        </div>
      </div>

      <SearchUsers closeFn={() => setSearching(false)} visible={searching} />
    </>
  );
};
