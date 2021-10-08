import { useNavigation, useRoute } from '@react-navigation/core';
import { COLORS } from 'config';
import React, { useEffect, useState } from 'react';
import { Animated, StatusBar, TouchableOpacity, View } from 'react-native';
import { CurvedBottomBar } from 'react-native-curved-bottom-bar';
import { scale } from 'react-native-utils-scale';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import GroupScreen from 'screens/group';
import HomeScreen from 'screens/home';
import WebrtcSimple from 'react-native-webrtc-simple';
import { styles } from './styles';

export interface Props {}

const defaultProps = {
  appName: 'Wellcome hooks',
};

StatusBar.setBarStyle('dark-content');
const MainScreen: React.FC<Props> = _props => {
  const { navigate } = useNavigation();
  const fullName = (useRoute().params as any)?.fullName;
  const [sessionId, setSessionId] = useState<string>('');

  useEffect(() => {
    startConnection();
  }, []);

  const startConnection = () => {
    const configuration: any = {
      optional: null,
      key: Math.random().toString(36).substr(2, 4),
    };

    WebrtcSimple.start(configuration, { frameRate: 120 })
      .then(status => {
        if (status) {
          WebrtcSimple.getSessionId((sessionId: string) => {
            setSessionId(sessionId);
          });
        }
      })
      .catch();
  };

  const _renderIcon = (routeName: string, selectTab: string) => {
    let icon = '';

    switch (routeName) {
      case 'title1':
        icon = 'user-circle-o';
        break;
      case 'title2':
        icon = 'group';
        break;
    }

    return (
      <FontAwesome
        name={icon}
        size={scale(25)}
        color={routeName === selectTab ? COLORS.PRIMARY : 'gray'}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <CurvedBottomBar.Navigator
        style={{ backgroundColor: '#F5F5F5' }}
        strokeWidth={0.5}
        height={scale(55)}
        circleWidth={scale(55)}
        bgColor="white"
        initialRouteName="title1"
        swipeEnabled
        renderCircle={() => (
          <Animated.View style={styles.btnCircle}>
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'center',
              }}
              onPress={() => navigate('Theme')}>
              <FontAwesome name={'th-large'} color="gray" size={scale(25)} />
            </TouchableOpacity>
          </Animated.View>
        )}
        tabBar={({ routeName, selectTab, navigate }) => {
          return (
            <TouchableOpacity
              onPress={() => navigate(routeName)}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {_renderIcon(routeName, selectTab)}
            </TouchableOpacity>
          );
        }}>
        <CurvedBottomBar.Screen
          name="title1"
          position="left"
          component={({ navigate }) => (
            <HomeScreen fullName={fullName} sessionId={sessionId} />
          )}
        />
        <CurvedBottomBar.Screen
          name="title2"
          position="right"
          component={({ navigate }) => (
            <GroupScreen fullName={fullName} sessionId={sessionId} />
          )}
        />
      </CurvedBottomBar.Navigator>
    </View>
  );
};

MainScreen.defaultProps = defaultProps;

export default MainScreen;
