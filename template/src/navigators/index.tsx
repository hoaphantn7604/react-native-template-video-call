import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import MainScreen from 'screens/bottombar';
import LoginScreen from 'screens/login';

import DropdownScreen from 'screens/theme/dropdown';
import CheckboxTreeScreen from 'screens/theme/checkboxTree';
import TimerScreen from 'screens/theme/timer';
import CountdownScreen from 'screens/theme/countdown';
import SwipeViewScreen from 'screens/theme/swipeView';
import MultiSelectScreen from 'screens/theme/multiselect';
import TextInputScreen from 'screens/theme/textInput';
import AvatarScreen from 'screens/theme/avatar';
import CheckboxScreen from 'screens/theme/checkbox';
import ThemeScreen from 'screens/theme/';

export const navigationRef: React.RefObject<NavigationContainerRef<any>> =
  React.createRef();
const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Theme" component={ThemeScreen} />
        <Stack.Screen name="Dropdown" component={DropdownScreen} />
        <Stack.Screen name="MultiSelect" component={MultiSelectScreen} />
        <Stack.Screen name="CheckboxTree" component={CheckboxTreeScreen} />
        <Stack.Screen name="Timer" component={TimerScreen} />
        <Stack.Screen name="Countdown" component={CountdownScreen} />
        <Stack.Screen name="SwipeView" component={SwipeViewScreen} />
        <Stack.Screen name="TextInput" component={TextInputScreen} />
        <Stack.Screen name="Avatar" component={AvatarScreen} />
        <Stack.Screen name="Checkbox" component={CheckboxScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default AppNavigator;
