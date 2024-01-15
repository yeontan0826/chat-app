import { useCallback } from 'react';
import styled from 'styled-components/native';
import moment from 'moment';

import Colors from '../../modules/colors';
import UserPhoto from '../userPhoto';
import ImageMessage from '../imageMessage';
import AudioMessage from '../audioMessage';

interface TextMessage {
  text: string;
}

interface ImageMessage {
  imageUrl: string;
}

interface AudioMessage {
  audioUrl: string;
}

interface MessageProps {
  name: string;
  message: TextMessage | ImageMessage | AudioMessage;
  createdAt: Date;
  isOtherMessage: boolean;
  userImageUrl?: string;
  unReadCount?: number;
}

const Message = ({
  name,
  message,
  createdAt,
  isOtherMessage,
  userImageUrl,
  unReadCount = 0,
}: MessageProps): JSX.Element => {
  const renderMessage = useCallback(() => {
    if ('text' in message) {
      return (
        <MessageText isOtherMessage={isOtherMessage}>
          {message.text}
        </MessageText>
      );
    }

    if ('imageUrl' in message) {
      return <ImageMessage url={message.imageUrl} />;
    }

    if ('audioUrl' in message) {
      return (
        <AudioMessage url={message.audioUrl} isOtherMessage={isOtherMessage} />
      );
    }
  }, [isOtherMessage, message]);

  const renderMessageContainer = useCallback<() => JSX.Element[]>(() => {
    const components = [
      <MetaInfo key={'metaInfo'} isOtherMessage={isOtherMessage}>
        {unReadCount > 0 && <UnReadCountLabel>{unReadCount}</UnReadCountLabel>}
        <TimeLabel>{moment(createdAt).format('HH:mm')}</TimeLabel>
      </MetaInfo>,
      <Bubble key={'message'} isOtherMessage={isOtherMessage}>
        {renderMessage()}
      </Bubble>,
    ];
    return isOtherMessage ? components.reverse() : components;
  }, [createdAt, isOtherMessage, renderMessage, unReadCount]);

  return (
    <Root>
      {isOtherMessage && (
        <UserImage imageUrl={userImageUrl} name={name} size={42} />
      )}
      <Container isOtherMessage={isOtherMessage}>
        {isOtherMessage && <NameLabel>{name}</NameLabel>}
        <MessageContainer>{renderMessageContainer()}</MessageContainer>
      </Container>
    </Root>
  );
};

export default Message;

const Root = styled.View`
  flex-direction: row;
`;

const UserImage = styled(UserPhoto)`
  margin-right: 10px;
`;

const Container = styled.View<{ isOtherMessage: boolean }>`
  flex: 1;
  align-items: ${props => (props.isOtherMessage ? 'flex-start' : 'flex-end')};
`;

const NameLabel = styled.Text`
  margin-bottom: 2px;
  font-size: 14px;
  font-weight: 500;
  color: ${Colors.BLACK};
`;

const MessageContainer = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;

const MetaInfo = styled.View<{ isOtherMessage: boolean }>`
  align-items: ${props => (props.isOtherMessage ? 'flex-start' : 'flex-end')};
  margin-right: ${props => (props.isOtherMessage ? 0 : 4)}px;
  margin-left: ${props => (props.isOtherMessage ? 4 : 0)}px;
`;

const UnReadCountLabel = styled.Text`
  font-size: 12px;
  color: ${Colors.GRAY};
`;

const TimeLabel = styled.Text`
  font-size: 12px;
  color: ${Colors.GRAY};
`;

const Bubble = styled.View<{ isOtherMessage: boolean }>`
  flex-shrink: 1;
  padding: 12px;
  border-radius: 12px;
  background-color: ${props =>
    props.isOtherMessage ? Colors.LIGHT_GRAY : Colors.BLACK};
`;

const MessageText = styled.Text<{ isOtherMessage: boolean }>`
  font-size: 14px;
  color: ${props => (props.isOtherMessage ? Colors.BLACK : Colors.WHITE)};
`;
