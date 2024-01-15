import { useCallback, useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ImageCropPicker from 'react-native-image-crop-picker';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import * as S from './styles';
import { RootStackParamList } from '../../navigations/root/types';
import { Collections } from '../../@types/firestore';
import { User } from '../../@types/user';
import Screen from '../../components/screen';
import AuthContext from '../../components/context/auth';

const HomeScreen = (): JSX.Element => {
  const { user: me, updateProfileImage } = useContext(AuthContext);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const { navigate } =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, 'HomeScreen'>
    >();

  const onPressLogout = useCallback(async () => {
    await auth().signOut();
  }, []);

  const loadUsers = useCallback(async () => {
    setLoadingUsers(true);

    const snapshot = await firestore().collection(Collections.USERS).get();
    setUsers(
      snapshot.docs
        .map(doc => doc.data() as User)
        .filter(user => user.userId !== me?.userId),
    );

    setLoadingUsers(false);
  }, [me?.userId]);

  const onPressProfile = useCallback(async () => {
    const image = await ImageCropPicker.openPicker({
      cropping: true,
      cropperCircleOverlay: true,
    });

    console.log('IMAGE : ', image);
    await updateProfileImage(image.path);
  }, [updateProfileImage]);

  const renderLoading = useCallback(
    () => (
      <S.LoadingContainer>
        <ActivityIndicator />
      </S.LoadingContainer>
    ),
    [],
  );

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  if (me === null) {
    return <></>;
  }

  return (
    <Screen title="홈">
      <S.Container>
        {/* 나의 정보 */}
        <View>
          <S.SectionTitle>나의 정보</S.SectionTitle>
          <S.UserSectionContent>
            <S.ProfileImage
              onPress={onPressProfile}
              imageUrl={me.profileUrl}
              text={me.name[0]}
            />
            <S.MyProfile>
              <S.MyNameLabel>{me.name}</S.MyNameLabel>
              <S.MyEmailLabel>{me.email}</S.MyEmailLabel>
            </S.MyProfile>
            <TouchableOpacity onPress={onPressLogout}>
              <S.LogoutLabel>로그아웃</S.LogoutLabel>
            </TouchableOpacity>
          </S.UserSectionContent>
        </View>
        {/* 대화 상대 목록 */}
        <S.UserListSection>
          {loadingUsers ? (
            renderLoading()
          ) : (
            <>
              <S.SectionTitleLabel>
                다른 사용자와 대화해보세요!
              </S.SectionTitleLabel>
              <FlatList
                data={users}
                ItemSeparatorComponent={() => <S.Separator />}
                ListEmptyComponent={() => (
                  <S.EmptyLabel>사용자가 없습니다</S.EmptyLabel>
                )}
                renderItem={({ item: user }) => (
                  <S.UserListItem
                    onPress={() => {
                      navigate('ChatScreen', {
                        userIds: [me.userId, user.userId],
                        other: user,
                      });
                    }}>
                    <S.UserImage imageUrl={user.profileUrl} name={user.name} />
                    <View>
                      <S.OtherNameLabel>{user.name}</S.OtherNameLabel>
                      <S.OtherEmailLabel>{user.email}</S.OtherEmailLabel>
                    </View>
                  </S.UserListItem>
                )}
              />
            </>
          )}
        </S.UserListSection>
      </S.Container>
    </Screen>
  );
};

export default HomeScreen;
