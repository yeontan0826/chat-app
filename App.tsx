import { NavigationContainer } from '@react-navigation/native';
import RootStackNavigation from './src/navigations/root';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AuthProvider from './src/components/provider/auth';

const App = (): JSX.Element => {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer>
          <RootStackNavigation />
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
};

export default App;
