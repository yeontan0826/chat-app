import styled from 'styled-components/native';
import Colors from '../../modules/colors';

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
  color: ${Colors.WHITE};
  font-size: 14px;
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
  padding: 20px;
  border-radius: 12px;
  background-color: ${Colors.LIGHT_GRAY};
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
