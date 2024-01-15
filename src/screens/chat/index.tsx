import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import ImageCropPicker from 'react-native-image-crop-picker';
import moment from 'moment';

import * as S from './styles';
import { RootStackParamList } from '../../navigations/root/types';
import Screen from '../../components/screen';
import useChat from '../../hooks/useChat';
import AuthContext from '../../components/context/auth';
import Message from '../../components/message';
import UserPhoto from '../../components/userPhoto';

const ChatScreen = (): JSX.Element => {
  const { params } = useRoute<RouteProp<RootStackParamList, 'ChatScreen'>>();
  const { other, userIds } = params;

  const { user: me } = useContext(AuthContext);
  const [text, setText] = useState('');
  const {
    loadingChat,
    chat,
    sendMessage,
    sending,
    messages,
    loadingMessages,
    updateMessageReadAt,
    userToMessageReadAt,
    sendImageMessage,
  } = useChat(userIds);

  useEffect(() => {
    if (me !== null && messages.length > 0) {
      updateMessageReadAt(me?.userId);
    }
  }, [me, me?.userId, messages.length, updateMessageReadAt]);

  const loading = loadingMessages || loadingChat;

  const sendDisabled = useMemo(() => text.length === 0, [text]);

  const onChangeText = useCallback<(newText: string) => void>(newText => {
    setText(newText);
  }, []);

  const onPressSendButton = useCallback(() => {
    // TODO: send text message
    if (me !== null) {
      sendMessage(text, me);
      setText('');
    }
  }, [me, sendMessage, text]);

  const onPressImageButton = useCallback(async () => {
    if (me !== null) {
      const image = await ImageCropPicker.openPicker({
        cropping: true,
      });

      sendImageMessage(image.path, me);
    }
  }, [me, sendImageMessage]);

  const renderChat = useCallback(() => {
    if (chat === null) {
      return null;
    }

    return (
      <S.ChatContainer>
        <S.MembersSection>
          <S.MembersTitleLabel>대화 상대</S.MembersTitleLabel>
          <FlatList
            data={chat.users}
            horizontal
            ItemSeparatorComponent={() => <S.Separator />}
            renderItem={({ item: user }) => (
              <UserPhoto
                size={34}
                imageUrl={user.profileUrl}
                name={user.name}
              />
            )}
          />
        </S.MembersSection>
        <FlatList
          inverted
          data={messages}
          style={{ marginVertical: 20 }}
          ItemSeparatorComponent={() => <S.MessageSeparator />}
          ListHeaderComponent={() => {
            if (sending) {
              return (
                <S.SendingContainer>
                  <ActivityIndicator />
                </S.SendingContainer>
              );
            }
            return null;
          }} // inverted이니까 사실상 footer
          renderItem={({ item: message }) => {
            const user = chat.users.find(u => u.userId === message.user.userId);

            const unReadUsers = chat.users.filter(u => {
              const messageReadAt = userToMessageReadAt[u.userId] ?? null;
              if (messageReadAt === null) {
                return true;
              }

              return moment(messageReadAt).isBefore(message.createdAt);
            });
            const unReadCount = unReadUsers.length;

            const commonProps = {
              name: user?.name ?? '',
              createdAt: message.createdAt,
              isOtherMessage: message.user.userId !== me?.userId,
              userImageUrl: user?.profileUrl,
              unReadCount: unReadCount,
            };

            if (message.text !== null) {
              return (
                <Message {...commonProps} message={{ text: message.text }} />
              );
            }

            if (message.imageUrl !== null) {
              return (
                <Message {...commonProps} message={{ url: message.imageUrl }} />
              );
            }

            return null;
          }}
        />
        <S.InputContainer>
          <S.TextInputContainer>
            <S.Input value={text} onChangeText={onChangeText} multiline />
          </S.TextInputContainer>
          <S.SendButton disabled={sendDisabled} onPress={onPressSendButton}>
            <S.SendIcon name="send" />
          </S.SendButton>
          <S.ImageButton onPress={onPressImageButton}>
            <S.ImageIcon name="image" />
          </S.ImageButton>
        </S.InputContainer>
      </S.ChatContainer>
    );
  }, [
    chat,
    messages,
    text,
    onChangeText,
    sendDisabled,
    onPressSendButton,
    onPressImageButton,
    sending,
    me?.userId,
    userToMessageReadAt,
  ]);

  return (
    <Screen title={other.name}>
      <S.Container>
        {loading ? (
          <S.LoadingContainer>
            <ActivityIndicator size={'large'} />
          </S.LoadingContainer>
        ) : (
          renderChat()
        )}
      </S.Container>
    </Screen>
  );
};

export default ChatScreen;
