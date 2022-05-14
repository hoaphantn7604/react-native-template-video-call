import { Button, Header } from 'components';
import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { HashtagInput } from 'react-native-element-textinput';
import { globalGroupCall } from 'react-native-webrtc-simple/UIKit';
import { styles } from './styles';

interface Props {
  fullName: string;
  sessionId: string;
}

const GroupScreen: React.FC<Props> = props => {
  const { fullName, sessionId: myId } = props;
  const [sessionId, setSessionId] = useState<string[]>([]);

  const startGroup = (sessionId: string[]) => {
    const data = {
      name: 'Group name',
      avatar:
        'https://www.atlantawatershed.org/wp-content/uploads/2017/06/default-placeholder.png',
    };
    globalGroupCall.call(sessionId, data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        name={`${fullName}: ${myId}`}
        onPressUser={() => {}}
        onChangeText={e => {}}
      />

      <View style={styles.boxMyStream}>
        <View style={styles.wrap}>
          <HashtagInput
            style={styles.input}
            placeholder="Session Id..."
            placeholderTextColor="gray"
            data={sessionId}
            onChangeValue={value => {
              setSessionId(value);
            }}
            focusColor="red"
            autoCapitalize={'none'}
          />
          <View style={styles.wrapButton}>
            <Button
              style={styles.button}
              title="Start"
              onPress={() => startGroup(sessionId)}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GroupScreen;
