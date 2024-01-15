import styled from 'styled-components/native';
import Colors from '../../modules/colors';
import Profile from '../../components/profile';
import UserPhoto from '../../components/userPhoto';

export const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

export const SectionTitle = styled.Text`
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: bold;
  color: ${Colors.BLACK};
`;

export const UserSectionContent = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 20px;
  border-radius: 12px;
  background-color: ${Colors.BLACK};
`;

export const ProfileImage = styled(Profile)`
  margin-right: 10px;
`;

export const MyProfile = styled.View`
  flex: 1;
`;

export const MyNameLabel = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${Colors.WHITE};
`;

export const MyEmailLabel = styled.Text`
  margin-top: 4px;
  font-size: 14px;
  color: ${Colors.WHITE};
`;

export const LogoutLabel = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${Colors.WHITE};
`;

export const UserListSection = styled.View`
  flex: 1;
  margin-top: 40px;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const SectionTitleLabel = styled.Text`
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: bold;
  color: ${Colors.BLACK};
`;

export const UserListItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 20px;
  border-radius: 12px;
  border-width: 1px;
  border-color: ${Colors.BLACK};
`;

export const UserImage = styled(UserPhoto)`
  margin-right: 10px;
`;

export const OtherNameLabel = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${Colors.BLACK};
`;

export const OtherEmailLabel = styled.Text`
  margin-top: 4px;
  font-size: 14px;
  color: ${Colors.BLACK};
`;

export const EmptyLabel = styled.Text`
  color: ${Colors.BLACK};
`;

export const Separator = styled.View`
  height: 10px;
`;
