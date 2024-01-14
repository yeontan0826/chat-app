import { useCallback, useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from './types';
import Colors from '../../modules/colors';
import AuthContext from '../../components/context/auth';

import LoadingScreen from '../../screens/loading';
import SignUpScreen from '../../screens/signUp';
import SignInScreen from '../../screens/signIn';
import HomeScreen from '../../screens/home';
import ChatScreen from '../../screens/chat';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStackNavigation = (): JSX.Element => {
  const { user, processingSignIn, processingSignUp, initialized } =
    useContext(AuthContext);

  const renderRootStack = useCallback(() => {
    if (!initialized) {
      return <Stack.Screen name="LoadingScreen" component={LoadingScreen} />;
    }

    if (user !== null && !processingSignIn && !processingSignUp) {
      // login
      return (
        <>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
        </>
      );
    } else {
      // logout
      return (
        <>
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          <Stack.Screen name="SignInScreen" component={SignInScreen} />
        </>
      );
    }
  }, [initialized, processingSignIn, processingSignUp, user]);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.WHITE },
      }}>
      {renderRootStack()}
    </Stack.Navigator>
  );
};

export default RootStackNavigation;
