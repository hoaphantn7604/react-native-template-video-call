import { Button, FlatList, Header } from 'components';
import React, { useEffect, useState } from 'react';
import { Alert, SafeAreaView, View } from 'react-native';
import { TextInput } from 'react-native-element-textinput';
import { useAppState } from 'react-native-utils-toolkit';
import { RTCView } from 'react-native-webrtc';
import WebrtcSimple from 'react-native-webrtc-simple';
import { CallEvents } from 'react-native-webrtc-simple/WebRtcSimple/contains';
import { styles } from './styles';

interface Props {}

let status: 'incall' | 'none' = 'none';

const GroupScreen: React.FC<Props> = props => {
  const stream = WebrtcSimple.getLocalStream();
  const [remotes, setRemotes] = useState<any>([]);
  const [mySessionId, setMySessionId] = useState<string>('');
  const [sessionId, setSessionId] = useState<string[]>([]);
  const [groupSessionId, setGroupSessionId] = useState<string[]>([]);

  useAppState(() => {
    WebrtcSimple.refresh(() => {});
  }, []);

  useEffect(() => {
    WebrtcSimple.getSessionId(id => {
      setMySessionId(id);
    });
    WebrtcSimple.listenings.getRemoteStream((remoteStream: any) => {
      setRemotes((e: any) => [...e, remoteStream]);
    });
    WebrtcSimple.listenings.callEvents((type, userData: any) => {
      if (type === 'GROUP_CALL') {
        if (userData?.groupSessionId?.length > 0) {
          Alert.alert('Start group call');
          setGroupSessionId(userData.groupSessionId);
        }
      }
      if (type === CallEvents.leaveGroup) {
        if (userData?.sessionId) {
        } else {
          setRemotes([]);
        }
      }
      if (type === CallEvents.joinGroup) {
        if (status === 'incall') {
          if (userData?.sessionId) {
            WebrtcSimple.events.addStream(userData?.sessionId);
          }
        }
      }
    });
  }, []);

  const _renderStream = ({ item, index }: any) => {
    if (remotes.length > 0) {
      return remotes.map((stream: any) => {
        return (
          <RTCView
            mirror
            streamURL={item.toURL()}
            zOrder={999}
            style={styles.remoteStream}
            objectFit="cover"
          />
        );
      });
    }
  };

  const startGroup = (sessionId: string[]) => {
    status = 'incall';
    if (sessionId.length > 0) {
      WebrtcSimple.events.groupCall(sessionId, { groupName: 'Test' });
    }
  };

  const joinGroup = () => {
    status = 'incall';
    WebrtcSimple.events.joinGroup(groupSessionId);
  };

  const leaveGroup = () => {
    status = 'none';
    WebrtcSimple.events.leaveGroup();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        name={`Session Id: ${mySessionId}`}
        onPressUser={() => {}}
        onChangeText={e => {}}
      />
      {stream && (
        <View style={styles.boxMyStream}>
          <RTCView
            mirror
            streamURL={stream.toURL()}
            zOrder={999}
            style={styles.myStream}
            objectFit="cover"
          />
          <View style={styles.wrap}>
            <TextInput
              style={styles.input}
              placeholder="Session Id..."
              placeholderTextColor="gray"
              hashtagValue={sessionId}
              onChangeHashtag={value => {
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
              <Button
                style={styles.button}
                title="join"
                onPress={() => joinGroup()}
              />
              <Button
                style={styles.button}
                title="Leave"
                onPress={() => leaveGroup()}
              />
            </View>
          </View>
        </View>
      )}
      <FlatList extraData={remotes} data={remotes} renderItem={_renderStream} />
    </SafeAreaView>
  );
};

export default GroupScreen;
