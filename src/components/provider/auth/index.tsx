import { useCallback, useEffect, useMemo, useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { User } from '../../../@types/user';
import { Collections } from '../../../@types/firestore';
import AuthContext from '../../context/auth';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [initialized, setInitialized] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [processingSignUp, setProcessingSignUp] = useState(false);

  useEffect(() => {
    const unsubscribe = auth().onUserChanged(async fbUser => {
      if (fbUser !== null) {
        // login
        setUser({
          userId: fbUser.uid,
          email: fbUser.email ?? '',
          name: fbUser.displayName ?? '',
        });
      } else {
        // logout
        setUser(null);
      }

      setInitialized(true);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const signUp = useCallback(
    async (email: string, password: string, name: string) => {
      setProcessingSignUp(true);

      try {
        const { user: currentUser } =
          await auth().createUserWithEmailAndPassword(email, password);
        await currentUser.updateProfile({ displayName: name });
        await firestore()
          .collection(Collections.USERS)
          .doc(currentUser.uid)
          .set({
            userId: currentUser.uid,
            email,
            name,
          });
      } finally {
        setProcessingSignUp(false);
      }
    },
    [],
  );

  const value = useMemo(() => {
    return {
      initialized,
      user,
      signUp,
      processingSignUp,
    };
  }, [initialized, processingSignUp, signUp, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
