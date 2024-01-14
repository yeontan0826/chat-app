import { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Colors from '../../modules/colors';

interface ScreenProps {
  title?: string;
  children?: React.ReactNode;
}

const Screen = ({ title, children }: ScreenProps): JSX.Element => {
  const { goBack, canGoBack } = useNavigation();

  const onPressBackButton = useCallback(() => {
    goBack();
  }, [goBack]);

  return (
    <Container>
      <Header>
        <HeaderLeft>
          {canGoBack() && (
            <TouchableOpacity onPress={onPressBackButton}>
              <BackButtonIcon name="arrow-back" />
            </TouchableOpacity>
          )}
        </HeaderLeft>
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
  justify-content: center;
`;

const BackButtonIcon = styled(MaterialIcons)`
  margin-left: 20px;
  font-size: 28px;
  color: ${Colors.BLACK};
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
