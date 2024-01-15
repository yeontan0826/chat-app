import { useCallback, useRef, useState } from 'react';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components/native';
import Colors from '../../modules/colors';

interface AudioMessageProps {
  url: string;
  isOtherMessage: boolean;
}

const AudioMessage = ({
  url,
  isOtherMessage,
}: AudioMessageProps): JSX.Element => {
  const [playing, setPlaying] = useState(false);
  const [remainingTimeInMs, setRemainingTimeInMs] = useState(0);
  const audioPlayerRef = useRef(new AudioRecorderPlayer());

  const stopPlay = useCallback(async () => {
    await audioPlayerRef.current.stopPlayer();
    setPlaying(false);
    audioPlayerRef.current.removePlayBackListener();
  }, []);

  const startPlay = useCallback(async () => {
    await audioPlayerRef.current.startPlayer(url);
    setPlaying(true);

    audioPlayerRef.current.addPlayBackListener(e => {
      const timeInMS = e.duration - e.currentPosition;
      setRemainingTimeInMs(timeInMS);

      if (timeInMS === 0) {
        stopPlay();
      }
    });
  }, [stopPlay, url]);

  return (
    <Container>
      <Button onPress={playing ? stopPlay : startPlay}>
        <Icon
          name={playing ? 'stop' : 'play-arrow'}
          isOtherMessage={isOtherMessage}
        />
      </Button>
      <TimeLabel isOtherMessage={isOtherMessage}>
        {audioPlayerRef.current.mmss(Math.floor(remainingTimeInMs / 1000))}
      </TimeLabel>
    </Container>
  );
};

export default AudioMessage;

const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Button = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  justify-content: center;
  align-items: center;
`;

const Icon = styled(MaterialIcons)<{ isOtherMessage: boolean }>`
  font-size: 24px;
  color: ${props => (props.isOtherMessage ? Colors.BLACK : Colors.WHITE)};
`;

const TimeLabel = styled.Text<{ isOtherMessage: boolean }>`
  min-width: 48px;
  font-size: 14px;
  color: ${props => (props.isOtherMessage ? Colors.BLACK : Colors.WHITE)};
`;
