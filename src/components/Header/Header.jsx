import { firebaseService } from 'service';
import { useChat } from 'context';
import { useResolved } from 'hooks';
import { useState, useRef } from 'react';
import { ImageUpload } from 'components';
import { IconGroup, Icon, Image, Loader } from 'semantic-ui-react';

export const Header = () => {
  const { chatConfig } = useChat();
  const configResolved = useResolved(chatConfig);
  const inputRef = useRef(null);
  const [image, setImage] = useState();

  const onFileAttach = file => {
    setImage(file);
  };

  return (
    <>
      <input
        type="file"
        className="file-input"
        ref={inputRef}
        accept="image/jpeg, image/png"
        onChange={e => {
          const file = e.target?.files?.[0];
          if (file) {
            onFileAttach(file);
          }
        }}
      ></input>

      {!!image && (
        <ImageUpload
          crop
          file={image}
          header="Set Your avatar"
          mode="message"
          onSubmit={croppedImage => {
            const storageRef = firebaseService.storage.ref();
            const uploadRef = storageRef.child(
              `${chatConfig.userSecret}_avatar.jpg`,
            );
            uploadRef.put(croppedImage).then(() => {
              uploadRef.getDownloadURL().then(url => {
                firebaseService.firestore
                  .collection('users')
                  .doc(chatConfig.userSecret)
                  .update({ avatar: url })
                  .then(() => {
                    setImage(null);
                  });
              });
            });
          }}
          close={() => setImage(null)}
        ></ImageUpload>
      )}

      <div className="left-rail-header">
        <Icon
          onClick={() => firebaseService.auth.signOut()}
          className="sign-out"
          name="sign out"
        ></Icon>
        {configResolved && !!chatConfig ? (
          <div className="current-user-info">
            <IconGroup
              onClick={() => {
                const input = inputRef.current;
                if (input) {
                  input.value = '';
                  input.click();
                }
              }}
              className="user-avatar"
              size="large"
            >
              {chatConfig.avatar ? (
                <Image src={chatConfig.avatar} avatar />
              ) : (
                <div className="empty-avatar">
                  {chatConfig.userName[0].toUpperCase()}
                </div>
              )}
              <Icon corner inverted circular name="camera"></Icon>
            </IconGroup>
            <div className="current-username">@{chatConfig.userName}</div>
          </div>
        ) : (
          <div className="user-loading">
            <Loader active size="small"></Loader>
          </div>
        )}
      </div>
    </>
  );
};
