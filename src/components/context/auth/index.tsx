import { createContext } from 'react';
import { User } from '../../../@types/user';

export interface AuthContextProp {
  initialized: boolean;
  user: User | null;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  processingSignUp: boolean; // 회원가입 진행 여부
  signIn: (email: string, password: string) => Promise<void>;
  processingSignIn: boolean;
  updateProfileImage: (filepath: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProp>({
  initialized: false,
  user: null,
  signUp: async () => {},
  processingSignUp: false,
  signIn: async () => {},
  processingSignIn: false,
  updateProfileImage: async () => {},
});

export default AuthContext;
