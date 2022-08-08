import { Button, Header } from 'components';
import { globalCall } from 'components/UIKit';
import React, { useState } from 'react';
import { Alert, SafeAreaView, View } from 'react-native';
import { TextInput } from 'react-native-element-textinput';
import { fontScale } from 'react-native-utils-scale';
import { styles } from './styles';

interface Props {
  fullName: string;
  sessionId: string;
}

const HomeScreen: React.FC<Props> = props => {
  const { fullName, sessionId } = props;
  const [callId, setCallId] = useState<string>('');
  const [receiverName] = useState<string>('Receiver name');

  const callToUser = (callId: string) => {
    if (callId.length > 0) {
      if (callId !== sessionId) {
        const useData = {
          sender_name: fullName,
          sender_avatar:
            'https://www.atlantawatershed.org/wp-content/uploads/2017/06/default-placeholder.png',
          receiver_name: receiverName,
          receiver_avatar:
            'https://www.atlantawatershed.org/wp-content/uploads/2017/06/default-placeholder.png',
        };
        globalCall.call(callId, useData);
      } else {
        Alert.alert("You can't call yourself");
      }
    } else {
      Alert.alert('Please enter call Id');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        name={`${fullName}: ${sessionId}`}
        onPressUser={() => {}}
        onChangeText={e => {}}
      />
        <View style={styles.boxMyStream}>
        <View style={styles.wrap}>
        <TextInput
          style={styles.input}
          inputStyle={{ fontSize: fontScale(16) }}
          labelStyle={{ fontSize: fontScale(16) }}
          textErrorStyle={{ fontSize: fontScale(16) }}
          autoCapitalize={'none'}
          label="Session Id"
          placeholder="Placeholder"
          placeholderTextColor="gray"
          onChangeText={text => {
            setCallId(text);
          }}
          focusColor="red"
        />
          <View style={styles.wrapButton}>
            <Button
              style={styles.button}
              title="Start"
              onPress={() => callToUser(callId)}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
