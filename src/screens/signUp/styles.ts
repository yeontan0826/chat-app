import styled from 'styled-components/native';
import Colors from '../../modules/colors';

export const Container = styled.ScrollView`
  flex: 1;
  padding: 20px;
`;

export const Section = styled.View`
  margin-bottom: 20px;
`;

export const Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${Colors.BLACK};
`;

export const Input = styled.TextInput`
  margin-top: 10px;
  padding: 10px;
  font-size: 16px;
  border-radius: 10px;
  border-width: 1px;
  border-color: ${Colors.GRAY};
`;

export const ErrorText = styled.Text`
  margin-top: 4px;
  font-size: 14px;
  color: ${Colors.RED};
`;

export const SignUpButton = styled.TouchableOpacity<{ enabled: boolean }>`
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  background-color: ${props => (props.enabled ? Colors.BLACK : Colors.GRAY)};
`;

export const SignUpButtonLabel = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${Colors.WHITE};
`;

export const SignInButton = styled.TouchableOpacity`
  align-items: center;
  margin-top: 5px;
  padding: 10px;
`;

export const SignInButtonLabel = styled.Text`
  font-size: 16px;
  color: ${Colors.GRAY};
`;

export const SigningContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
