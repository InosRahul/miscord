import { useChat } from 'context';
import { useEffect, useState } from 'react';
import { Image } from 'semantic-ui-react';
import { otherUser } from 'utils';
import { firebaseService } from 'service';

export const ChatAvatar = ({ chat, username, className }) => {
  const { chatConfig } = useChat();
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    firebaseService.firestore
      .collection('users')
      .where('userName', '==', username)
      .get()
      .then(res => {
        const data = res.docs[0]?.data();
        if (data?.avatar) {
          setAvatar(data.avatar);
        }
      });
  }, [chat, chatConfig, username]);

  return avatar ? (
    <Image className={className || 'chat-list-avatar'} src={avatar}></Image>
  ) : (
    <div className={className || 'empty-avatar'}>
      {otherUser(chatConfig, chat)[0].toUpperCase()}
    </div>
  );
};
