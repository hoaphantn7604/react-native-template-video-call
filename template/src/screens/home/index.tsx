import {
  Button,
  FlatList,
  globalLoading,
  Header,
  Modal,
  Text,
} from 'components';
import React, { useEffect, useState } from 'react';
import { Alert, SafeAreaView, View } from 'react-native';
import { Image } from 'react-native-element-image';
import { TextInput } from 'react-native-element-textinput';
import { fontScale, scale } from 'react-native-utils-scale';
import { useAppState } from 'react-native-utils-toolkit';
import Feather from 'react-native-vector-icons/Feather';
import WebrtcSimple from 'react-native-webrtc-simple';
import {
  globalCall,
  globalCallRef,
  GlobalCallUI,
} from 'react-native-webrtc-simple/UIKit';
import { DATA } from './constant';
import { styles } from './styles';

interface Props {
  fullName: string;
}

const HomeScreen: React.FC<Props> = props => {
  const { fullName } = props;
  const [visible, setVisible] = useState<boolean>(false);
  const [sessionId, setSessionId] = useState<string>('');
  const [callId, setCallId] = useState<string>('');
  const [receverName, setReceverName] = useState<string>('');

  useAppState(state => {
    if (state === 'active') {
      WebrtcSimple.refresh(() => {});
    }
  }, []);

  useEffect(() => {
    startConnection();
  }, []);

  const startConnection = () => {
    globalLoading.show();
    const configuration: any = {
      optional: null,
      key: Math.random().toString(36).substr(2, 4),
    };

    globalCall.start(configuration, sessionId => {
      globalLoading.hide();
      setSessionId(sessionId);
    });
  };

  const callToUser = (callId: string, name: string) => {
    if (callId.length > 0) {
      if (callId !== sessionId) {
        const data = {
          sender_name: fullName,
          sender_avatar:
            'https://www.atlantawatershed.org/wp-content/uploads/2017/06/default-placeholder.png',
          receiver_name: receverName,
          receiver_avatar:
            'https://www.atlantawatershed.org/wp-content/uploads/2017/06/default-placeholder.png',
        };
        WebrtcSimple.events.call(callId, data);
        setVisible(false);
      } else {
        Alert.alert("You can't call yourself");
      }
    } else {
      Alert.alert('Please enter call Id');
    }
  };

  const onOpenCall = (name: string) => {
    setReceverName(name);
    setVisible(true);
  };

  const _renderItem = ({ item, index }: any) => {
    return (
      <View style={styles.item}>
        <Image style={styles.img} width={80} source={item.img} />
        <View style={styles.wrap}>
          <Text style={styles.text} fontSize={16} bold>
            {item.name}
          </Text>
          <Text style={styles.text} fontSize={14}>
            {item.message}
          </Text>
        </View>
        <Text style={styles.text} fontSize={14}>
          30/09
        </Text>
        <Feather
          name="video"
          size={scale(26)}
          onPress={() => onOpenCall(item.name)}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        name={`Session Id: ${sessionId}`}
        onPressUser={() => {}}
        onChangeText={e => {}}
      />
      <FlatList data={DATA} renderItem={_renderItem} />
      <GlobalCallUI ref={globalCallRef} />
      <Modal
        visible={visible}
        transparent
        maxHeight={500}
        onRequestClose={() => setVisible(false)}>
        <View style={styles.modal}>
          <Text bold fontSize={26}>
            {receverName}
          </Text>
          <TextInput
            style={{ marginVertical: scale(20) }}
            containerStyle={styles.textinput}
            inputStyle={{ fontSize: fontScale(16) }}
            labelStyle={{ fontSize: fontScale(18) }}
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
          <Button
            title="Call"
            textColor="white"
            onPress={() => {
              callToUser(callId, receverName);
            }}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default HomeScreen;
