import { useCallback, useContext, useMemo, useState } from 'react';
import { ActivityIndicator, Alert, View } from 'react-native';
import validator from 'validator';

import * as S from './styles';
import Screen from '../../components/screen';
import AuthContext from '../../components/context/auth';

const SignInScreen = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, processingSignIn } = useContext(AuthContext);

  // input error text
  const emailErrorText = useMemo<string | null>(() => {
    if (email.length === 0) {
      return '이메일을 입력해 주세요';
    }

    if (!validator.isEmail(email)) {
      return '올바른 이메일이 아닙니다';
    }

    return null;
  }, [email]);

  const passwordErrorText = useMemo<string | null>(() => {
    if (password.length === 0) {
      return '비밀번호를 입력해 주세요';
    }

    if (password.length < 6) {
      return '비밀번호는 6자리 이상이여야 합니다';
    }

    return null;
  }, [password]);

  const onChangeEmailText = useCallback<(text: string) => void>(text => {
    setEmail(text);
  }, []);
  const onChangePasswordText = useCallback<(text: string) => void>(text => {
    setPassword(text);
  }, []);

  const signInButtonEnabled = useMemo<boolean>(() => {
    return emailErrorText === null && passwordErrorText === null;
  }, [emailErrorText, passwordErrorText]);

  const onPressSignInButton = useCallback<() => Promise<void>>(async () => {
    try {
      await signIn(email, password);
    } catch (error: any) {
      Alert.alert(error.message);
    }
  }, [email, password, signIn]);

  return (
    <Screen title="로그인">
      {processingSignIn ? (
        <S.SigningContainer>
          <ActivityIndicator />
        </S.SigningContainer>
      ) : (
        <S.Container>
          <S.Section>
            <S.Title>이메일</S.Title>
            <S.Input
              value={email}
              onChangeText={onChangeEmailText}
              placeholder="이메일을 입력해 주세요"
              autoCapitalize="none"
            />
            {emailErrorText && <S.ErrorText>{emailErrorText}</S.ErrorText>}
          </S.Section>
          <S.Section>
            <S.Title>비밀번호</S.Title>
            <S.Input
              value={password}
              onChangeText={onChangePasswordText}
              placeholder="비밀번호를 입력해 주세요"
              autoCapitalize="none"
              secureTextEntry
            />
            {passwordErrorText && (
              <S.ErrorText>{passwordErrorText}</S.ErrorText>
            )}
          </S.Section>
          <View>
            <S.SignInButton
              disabled={!signInButtonEnabled}
              onPress={onPressSignInButton}>
              <S.SignInButtonLabel>로그인</S.SignInButtonLabel>
            </S.SignInButton>
          </View>
        </S.Container>
      )}
    </Screen>
  );
};

export default SignInScreen;
