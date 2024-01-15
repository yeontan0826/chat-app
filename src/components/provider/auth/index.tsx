import { useCallback, useEffect, useMemo, useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import _ from 'lodash';

import { User } from '../../../@types/user';
import { Collections } from '../../../@types/firestore';
import AuthContext from '../../context/auth';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [initialized, setInitialized] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [processingSignUp, setProcessingSignUp] = useState(false);
  const [processingSignIn, setProcessingSignIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth().onUserChanged(async fbUser => {
      if (fbUser !== null) {
        // login
        setUser({
          userId: fbUser.uid,
          email: fbUser.email ?? '',
          name: fbUser.displayName ?? '',
          profileUrl: fbUser.photoURL ?? '',
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

  const signIn = useCallback<
    (email: string, password: string) => Promise<void>
  >(async (email, password) => {
    setProcessingSignIn(true);

    try {
      await auth().signInWithEmailAndPassword(email, password);
    } finally {
      setProcessingSignIn(false);
    }
  }, []);

  const updateProfileImage = useCallback<(filepath: string) => Promise<void>>(
    async filepath => {
      if (user === null) {
        throw new Error('User is undefined');
      }

      // Upload image
      const filename = _.last(filepath.split('/'));

      if (filename === undefined) {
        throw new Error('Filename is undefined');
      }

      const storageFilepath = `users/${user.userId}/${filename}`;
      const snapshot = await storage().ref(storageFilepath).putFile(filepath);

      // Register image on user profile
      const url = await storage()
        .ref(snapshot.metadata.fullPath)
        .getDownloadURL();
      await auth().currentUser?.updateProfile({ photoURL: url });
      await firestore()
        .collection(Collections.USERS)
        .doc(user.userId)
        .update({ profileUrl: url });
    },
    [user],
  );

  const value = useMemo(() => {
    return {
      initialized,
      user,
      signUp,
      processingSignUp,
      signIn,
      processingSignIn,
      updateProfileImage,
    };
  }, [
    initialized,
    processingSignIn,
    processingSignUp,
    signIn,
    signUp,
    updateProfileImage,
    user,
  ]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
