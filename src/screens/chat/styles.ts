import styled from 'styled-components/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../modules/colors';

export const Container = styled.View`
  flex: 1;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ChatContainer = styled.View`
  flex: 1;
  padding: 20px;
`;

export const MembersSection = styled.View``;

export const MembersTitleLabel = styled.Text`
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: bold;
  color: ${Colors.BLACK};
`;

export const UserProfile = styled.View`
  width: 34px;
  height: 34px;
  justify-content: center;
  align-items: center;
  border-radius: 17px;
  border-width: 1px;
  border-color: ${Colors.LIGHT_GRAY};
  background-color: ${Colors.BLACK};
`;

export const UserProfileText = styled.Text`
  color: ${Colors.WHITE};
`;

export const Separator = styled.View`
  width: 4px;
`;

export const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const TextInputContainer = styled.View`
  flex: 1;
  min-height: 50px;
  justify-content: center;
  margin-right: 10px;
  padding: 10px;
  border-radius: 24px;
  border-width: 1px;
  border-color: ${Colors.BLACK};
  overflow: hidden;
`;

export const Input = styled.TextInput`
  padding-top: 0;
  padding-bottom: 0;
`;

export const SendButton = styled.TouchableOpacity<{ disabled: boolean }>`
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  background-color: ${props =>
    props.disabled ? Colors.LIGHT_GRAY : Colors.BLACK};
`;

export const SendIcon = styled(MaterialIcons)`
  font-size: 24px;
  color: ${Colors.WHITE};
`;

export const ImageButton = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
  margin-left: 8px;
  border-radius: 10px;
  border-width: 1.4px;
  border-color: ${Colors.BLACK};
  background-color: ${Colors.WHITE};
`;

export const ImageIcon = styled(MaterialIcons)`
  font-size: 32px;
  color: ${Colors.BLACK};
`;

export const MessageSeparator = styled.View`
  height: 10px;
`;

export const SendingContainer = styled.View`
  align-items: center;
  padding-top: 10px;
`;
