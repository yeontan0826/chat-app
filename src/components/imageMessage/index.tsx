import { useCallback, useMemo, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { ImageSource } from 'react-native-image-viewing/dist/@types';
import ImageView from 'react-native-image-viewing';
import styled from 'styled-components/native';

interface ImageMessageProps {
  url: string;
}

const ImageMessage = ({ url }: ImageMessageProps): JSX.Element => {
  const [viewerVisible, setViewerVisible] = useState(false);
  const images = useMemo<ImageSource[]>(
    () => (url !== null ? [{ uri: url }] : []),
    [url],
  );

  const showImageViewer = useCallback(() => {
    setViewerVisible(true);
  }, []);

  return (
    <>
      <TouchableOpacity onPress={showImageViewer}>
        <Image source={{ uri: url }} resizeMode="contain" />
        <ImageView
          images={images}
          imageIndex={0}
          visible={viewerVisible}
          onRequestClose={() => setViewerVisible(false)}
        />
      </TouchableOpacity>
    </>
  );
};

export default ImageMessage;

const Image = styled.Image`
  width: 100px;
  height: 100px;
`;
