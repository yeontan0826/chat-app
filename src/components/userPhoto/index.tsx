import { useCallback, useMemo, useState } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { ImageSource } from 'react-native-image-viewing/dist/@types';
import ImageView from 'react-native-image-viewing';

import Profile from '../profile';

interface UserPhotoProps {
  size?: number;
  style?: StyleProp<ViewStyle>;
  imageUrl?: string;
  name?: string;
  nameStyle?: StyleProp<TextStyle>;
}

const UserPhoto = ({
  size = 48,
  style,
  imageUrl,
  name,
  nameStyle,
}: UserPhotoProps): JSX.Element => {
  const [viewerVisible, setViewerVisible] = useState(false);

  const images = useMemo<ImageSource[]>(
    () => (imageUrl !== null ? [{ uri: imageUrl }] : []),
    [imageUrl],
  );

  const showImageView = useCallback(() => {
    setViewerVisible(true);
  }, []);

  return (
    <>
      <Profile
        size={size}
        style={style}
        imageUrl={imageUrl}
        onPress={images.length > 0 ? showImageView : undefined}
        text={name?.[0].toUpperCase()}
        textStyle={nameStyle}
      />
      <ImageView
        images={images}
        imageIndex={0}
        visible={viewerVisible}
        onRequestClose={() => setViewerVisible(false)}
      />
    </>
  );
};

export default UserPhoto;
