/**
 * 프로필 이미지
 * @returns
 */

import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import styled from 'styled-components/native';
import Colors from '../../modules/colors';

interface ProfileProps {
  size?: number;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  imageUrl?: string;
  text?: string;
  textStyle?: StyleProp<TextStyle>;
}

const Profile = ({
  size = 48,
  style,
  onPress,
  imageUrl,
  text,
  textStyle,
}: ProfileProps): JSX.Element => {
  return (
    <TouchableOpacity disabled={onPress === undefined} onPress={onPress}>
      <Container size={size} hasImageUrl={!!imageUrl} style={style}>
        {imageUrl ? (
          <ProfileImage size={size} source={{ uri: imageUrl }} />
        ) : text ? (
          <ProfileName style={textStyle}>{text}</ProfileName>
        ) : null}
      </Container>
    </TouchableOpacity>
  );
};

export default Profile;

const Container = styled.View<{ size: number; hasImageUrl: boolean }>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  justify-content: center;
  align-items: center;
  border-radius: ${props => props.size / 2}px;
  background-color: ${props =>
    props.hasImageUrl ? Colors.LIGHT_GRAY : Colors.BLACK};
  overflow: hidden;
`;

const ProfileImage = styled.Image<{ size: number }>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
`;

const ProfileName = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${Colors.WHITE};
`;
