import { useCallback } from 'react';
import styled from 'styled-components/native';
import moment from 'moment';

import Colors from '../../modules/colors';

interface MessageProps {
  name: string;
  text: string;
  createdAt: Date;
  isOtherMessage: boolean;
}

const Message = ({
  name,
  text,
  createdAt,
  isOtherMessage,
}: MessageProps): JSX.Element => {
  const renderMessageContainer = useCallback<() => JSX.Element[]>(() => {
    const components = [
      <TimeLabel key={'timeLabel'} isOtherMessage={isOtherMessage}>
        {moment(createdAt).format('HH:mm')}
      </TimeLabel>,
      <Bubble key={'message'} isOtherMessage={isOtherMessage}>
        <MessageText isOtherMessage={isOtherMessage}>{text}</MessageText>
      </Bubble>,
    ];
    return isOtherMessage ? components.reverse() : components;
  }, [createdAt, isOtherMessage, text]);

  return (
    <Container isOtherMessage={isOtherMessage}>
      <NameLabel>{name}</NameLabel>
      <MessageContainer>{renderMessageContainer()}</MessageContainer>
    </Container>
  );
};

export default Message;

const Container = styled.View<{ isOtherMessage: boolean }>`
  align-items: ${props => (props.isOtherMessage ? 'flex-start' : 'flex-end')};
`;

const NameLabel = styled.Text`
  margin-bottom: 4px;
  font-size: 14px;
  font-weight: 500;
  color: ${Colors.BLACK};
`;

const MessageContainer = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;

const TimeLabel = styled.Text<{ isOtherMessage: boolean }>`
  margin-right: ${props => (props.isOtherMessage ? 0 : 6)}px;
  margin-left: ${props => (props.isOtherMessage ? 6 : 0)}px;
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
