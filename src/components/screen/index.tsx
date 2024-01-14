import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import Colors from '../../modules/colors';

interface ScreenProps {
  title?: string;
  children?: React.ReactNode;
}

const Screen = ({ title, children }: ScreenProps): JSX.Element => {
  return (
    <Container>
      <Header>
        <HeaderLeft />
        <HeaderCenter>
          <HeaderTitle>{title}</HeaderTitle>
        </HeaderCenter>
        <HeaderRight />
      </Header>
      <Body>{children}</Body>
    </Container>
  );
};

export default Screen;

const Container = styled(SafeAreaView)`
  flex: 1;
`;

const Header = styled.View`
  height: 48px;
  flex-direction: row;
`;

const HeaderLeft = styled.View`
  flex: 1;
`;

const HeaderCenter = styled.View`
  flex: 3;
  justify-content: center;
  align-items: center;
`;

const HeaderRight = styled.View`
  flex: 1;
`;

const HeaderTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${Colors.BLACK};
`;

const Body = styled.View`
  flex: 1;
`;
