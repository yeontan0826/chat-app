import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

const LoadingScreen = (): JSX.Element => {
  return (
    <Container>
      <ActivityIndicator size={'large'} />
    </Container>
  );
};

export default LoadingScreen;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
