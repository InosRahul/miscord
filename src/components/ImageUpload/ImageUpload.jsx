import { useState, useEffect, useRef } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { Image, Modal } from 'semantic-ui-react';

export const ImageUpload = ({
  file,
  close,
  onSubmit,
  crop = false,
  header = 'Send This Image ?',
}) => {
  const [imageSrc, setImageSrc] = useState('');
  const cropRef = useRef();

  useEffect(() => {
    const fr = new FileReader();
    fr.onload = () => setImageSrc(fr.result);
    fr.readAsDataURL(file);
  }, [file]);

  return (
    <Modal dimmer="blurring" open={true}>
      <Modal.Header>{header}</Modal.Header>
      <Modal.Content image>
        {crop ? (
          <AvatarEditor
            ref={cropRef}
            width={200}
            height={200}
            border={50}
            image={imageSrc}
          ></AvatarEditor>
        ) : (
          <Image size="medium" src={imageSrc} alt="preview"></Image>
        )}
      </Modal.Content>
      <Modal.Actions>
        <div className="image-upload-actions">
          <button className="cancel" onClick={close}>
            Cancel
          </button>
          <button
            className="submit"
            onClick={() => {
              if (crop && cropRef) {
                const canvas = cropRef.current
                  .getImageScaledToCanvas()
                  .toDataURL();
                fetch(canvas)
                  .then(res => res.blob())
                  .then(blob => onSubmit(blob));
              } else {
                onSubmit();
              }
            }}
          >
            Upload
          </button>
        </div>
      </Modal.Actions>
    </Modal>
  );
};
