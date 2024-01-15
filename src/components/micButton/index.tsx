import { useCallback, useRef, useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import AudioRecorderPlayer, {
  AVEncodingOption,
  AudioEncoderAndroidType,
} from 'react-native-audio-recorder-player';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components/native';

import Colors from '../../modules/colors';

interface MicButtonProps {
  onRecorded: (path: string) => void;
}

const MicButton = ({ onRecorded }: MicButtonProps): JSX.Element => {
  const [recording, setRecording] = useState(false);
  const audioRecorderPlayerRef = useRef(new AudioRecorderPlayer());

  const startRecord = useCallback(async () => {
    if (Platform.OS === 'android') {
      const grants = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);

      const granted =
        grants[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] ===
        PermissionsAndroid.RESULTS.GRANTED;

      if (!granted) {
        return;
      }
    }

    await audioRecorderPlayerRef.current.startRecorder(undefined, {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    });

    audioRecorderPlayerRef.current.addRecordBackListener(() => {});
    setRecording(true);
  }, []);

  const stopRecord = useCallback(async () => {
    const uri = await audioRecorderPlayerRef.current.stopRecorder();
    audioRecorderPlayerRef.current.removeRecordBackListener();
    setRecording(false);
    onRecorded(uri);
  }, [onRecorded]);

  if (recording) {
    return (
      <Button onPress={stopRecord}>
        <StopIcon name="stop" />
      </Button>
    );
  }

  return (
    <Button onPress={startRecord}>
      <MicIcon name="mic" />
    </Button>
  );
};

export default MicButton;

const Button = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border-width: 1px;
  border-color: ${Colors.BLACK};
`;

const MicIcon = styled(MaterialIcons)`
  font-size: 32px;
  color: ${Colors.BLACK};
`;

const StopIcon = styled(MaterialIcons)`
  font-size: 32px;
  color: ${Colors.BLACK};
`;
