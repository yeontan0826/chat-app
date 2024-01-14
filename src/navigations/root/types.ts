import { User } from '../../@types/user';

export type RootStackParamList = {
  LoadingScreen: undefined;
  SignUpScreen: undefined;
  SignInScreen: undefined;
  HomeScreen: undefined;
  ChatScreen: {
    userIds: string[];
    other: User;
  };
};
