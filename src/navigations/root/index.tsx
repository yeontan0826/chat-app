import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from './types';
import SignUpScreen from '../../screens/signUp';
import SignInScreen from '../../screens/signIn';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStackNavigation = (): JSX.Element => {
  return (
    <Stack.Navigator
      initialRouteName="SignUpScreen"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
    </Stack.Navigator>
  );
};

export default RootStackNavigation;
