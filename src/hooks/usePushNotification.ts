import { useCallback, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { RESULTS, requestNotifications } from 'react-native-permissions';
import messaging from '@react-native-firebase/messaging';
import AuthContext from '../components/context/auth';

const usePushNotification = () => {
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const { user, addFcmToken } = useContext(AuthContext);

  // 앱 최초 실행 시 토큰 저장
  useEffect(() => {
    messaging()
      .getToken()
      .then(token => {
        setFcmToken(token);
      });
  }, []);

  // 앱 사용중 토큰이 refresh되면 새로운 토큰 저장
  useEffect(() => {
    const unsubscribe = messaging().onTokenRefresh(token => {
      setFcmToken(token);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user !== null && fcmToken !== null) {
      addFcmToken(fcmToken);
    }
  }, [addFcmToken, fcmToken, user]);

  const requestPermission = useCallback(async () => {
    const { status } = await requestNotifications([]);
    const enabled = status === RESULTS.GRANTED;

    if (!enabled) {
      Alert.alert('알림 권한을 허용해 주세요');
    }
  }, []);

  useEffect(() => {
    requestPermission();
  }, [requestPermission]);
};

export default usePushNotification;
