import { useNavigation } from '@react-navigation/core';
import { Button, globalLoading, Text } from 'components';
import { useFormik } from 'formik';
import React from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-element-textinput';
import { styles } from './styles';

interface Props {}

const LoginScrenn: React.FC<Props> = props => {
  const { navigate } = useNavigation();
  const formik = useFormik({
    initialValues: {
      fullName: '',
    },
    validate: values => {
      const error: any = {};
      if (values.fullName.length === 0) {
        error.fullName = 'Please enter username';
      }

      return error;
    },
    onSubmit: values => {
      globalLoading.show();
      setTimeout(() => {
        globalLoading.hide();
        navigate('Main', { fullName: values.fullName });
      }, 1000);
    },
  });
  return (
    <View style={styles.container}>
      <Text style={styles.title} bold fontSize={30}>
        Login
      </Text>
      <TextInput
        style={styles.textinput}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        textErrorStyle={styles.textErrorStyle}
        placeholderStyle={styles.placeholder}
        value={formik.values.fullName}
        onChangeText={formik.handleChange('fullName')}
        label="Nick name"
        placeholder="Placeholder"
        placeholderTextColor="gray"
        focusColor="red"
        textError={formik.errors.fullName}
      />

      <Button
        style={styles.button}
        title="Login"
        border
        fontSize={20}
        onPress={formik.handleSubmit}
      />
    </View>
  );
};

export default LoginScrenn;
