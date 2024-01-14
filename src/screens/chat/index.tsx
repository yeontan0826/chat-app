import { useCallback, useContext, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

import * as S from './styles';
import { RootStackParamList } from '../../navigations/root/types';
import Screen from '../../components/screen';
import useChat from '../../hooks/useChat';
import AuthContext from '../../components/context/auth';
import Message from '../../components/message';

const ChatScreen = (): JSX.Element => {
  const { params } = useRoute<RouteProp<RootStackParamList, 'ChatScreen'>>();
  const { other, userIds } = params;

  const { user: me } = useContext(AuthContext);
  const [text, setText] = useState('');
  const { loadingChat, chat, sendMessage, sending, messages, loadingMessages } =
    useChat(userIds);

  const sendDisabled = useMemo(() => text.length === 0, [text]);

  const loading = loadingMessages || loadingChat;

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
              <S.UserProfile>
                <S.UserProfileText>{user.name[0]}</S.UserProfileText>
              </S.UserProfile>
            )}
          />
        </S.MembersSection>
        <FlatList
          inverted
          data={messages}
          ItemSeparatorComponent={() => <S.MessageSeparator />}
          style={{ marginVertical: 20 }}
          renderItem={({ item: message }) => (
            <Message
              name={message.user.name}
              text={message.text}
              createdAt={message.createdAt}
              isOtherMessage={message.user.userId !== me?.userId}
            />
          )}
        />
        <S.InputContainer>
          <S.TextInputContainer>
            <S.Input value={text} onChangeText={onChangeText} multiline />
          </S.TextInputContainer>
          <S.SendButton disabled={sendDisabled} onPress={onPressSendButton}>
            <S.SendIcon name="send" />
          </S.SendButton>
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
    me?.userId,
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
