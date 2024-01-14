import { useCallback, useContext, useMemo, useState } from 'react';
import { ActivityIndicator, Alert, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import validator from 'validator';

import * as S from './styles';
import { RootStackParamList } from '../../navigations/root/types';
import Screen from '../../components/screen';
import AuthContext from '../../components/context/auth';

const SignUpScreen = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [name, setName] = useState('');
  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { processingSignUp, signUp } = useContext(AuthContext);

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

    if (password !== confirmedPassword) {
      return '비밀번호를 확인해 주세요';
    }

    return null;
  }, [password, confirmedPassword]);

  const confirmedPasswordErrorText = useMemo(() => {
    if (confirmedPassword.length === 0) {
      return '비밀번호를 다시 입력해 주세요';
    }

    if (confirmedPassword.length < 6) {
      return '비밀번호는 6자리 이상이여야 합니다';
    }

    if (password !== confirmedPassword) {
      return '비밀번호를 확인해 주세요';
    }

    return null;
  }, [password, confirmedPassword]);

  const nameErrorText = useMemo(() => {
    if (name.length === 0) {
      return '이름을 입력해 주세요';
    }

    return null;
  }, [name]);

  // input change handler
  const onChangeEmailText = useCallback<(text: string) => void>(text => {
    setEmail(text);
  }, []);

  const onChangePasswordText = useCallback<(text: string) => void>(text => {
    setPassword(text);
  }, []);

  const onChangeConfirmedPasswordText = useCallback<(text: string) => void>(
    text => {
      setConfirmedPassword(text);
    },
    [],
  );
  const onChangeNameText = useCallback<(text: string) => void>(text => {
    setName(text);
  }, []);

  const signUpButtonEnabled = useMemo<boolean>(() => {
    return (
      emailErrorText === null &&
      passwordErrorText === null &&
      confirmedPasswordErrorText === null &&
      nameErrorText === null
    );
  }, [
    confirmedPasswordErrorText,
    emailErrorText,
    nameErrorText,
    passwordErrorText,
  ]);

  // 회원가입
  const onPressSignUpButton = useCallback(async () => {
    try {
      await signUp(email, password, name);
    } catch (error: any) {
      Alert.alert(error.message);
    }
  }, [email, name, password, signUp]);

  // 로그인 스크린으로 이동
  const onPressSignInButton = useCallback(() => {
    navigate('SignInScreen');
  }, [navigate]);

  return (
    <Screen title="회원가입">
      {processingSignUp ? (
        <S.SigningContainer>
          <ActivityIndicator />
        </S.SigningContainer>
      ) : (
        <S.Container>
          {/* 이메일 */}
          <S.Section>
            <S.Title>이메일</S.Title>
            <S.Input
              value={email}
              onChangeText={onChangeEmailText}
              autoCapitalize="none"
              placeholder="이메일을 입력해 주세요"
            />
            {emailErrorText && <S.ErrorText>{emailErrorText}</S.ErrorText>}
          </S.Section>
          {/* 비밀번호 */}
          <S.Section>
            <S.Title>비밀번호</S.Title>
            <S.Input
              value={password}
              onChangeText={onChangePasswordText}
              autoCapitalize="none"
              secureTextEntry
              placeholder="비밀번호를 입력해 주세요"
            />
            {passwordErrorText && (
              <S.ErrorText>{passwordErrorText}</S.ErrorText>
            )}
          </S.Section>
          {/* 비밀번호 확인 */}
          <S.Section>
            <S.Title>비밀번호 확인</S.Title>
            <S.Input
              value={confirmedPassword}
              onChangeText={onChangeConfirmedPasswordText}
              autoCapitalize="none"
              secureTextEntry
              placeholder="비밀번호를 다시 입력해 주세요"
            />
            {confirmedPasswordErrorText && (
              <S.ErrorText>{confirmedPasswordErrorText}</S.ErrorText>
            )}
          </S.Section>
          {/* 이름 */}
          <S.Section>
            <S.Title>이름</S.Title>
            <S.Input
              value={name}
              onChangeText={onChangeNameText}
              autoCapitalize="none"
              placeholder="이름을 입력해 주세요"
            />
            {nameErrorText && <S.ErrorText>{nameErrorText}</S.ErrorText>}
          </S.Section>
          <View>
            <S.SignUpButton
              disabled={!signUpButtonEnabled}
              onPress={onPressSignUpButton}>
              <S.SignUpButtonLabel>회원가입</S.SignUpButtonLabel>
            </S.SignUpButton>
            <S.SignInButton onPress={onPressSignInButton}>
              <S.SignInButtonLabel>이미 계정이 있으신가요?</S.SignInButtonLabel>
            </S.SignInButton>
          </View>
        </S.Container>
      )}
    </Screen>
  );
};

export default SignUpScreen;
