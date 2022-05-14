import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { HashtagInput } from 'react-native-element-textinput';
import { fontScale, scale } from 'react-native-utils-scale';

const TextInputComponent = () => {
  const [value, setValue] = useState<string[]>([]);

  return (
    <View style={styles.container}>
      <HashtagInput
        data={value}
        style={styles.input}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        hashtagStyle={styles.hashtagStyle}
        hashtagTextStyle={styles.hashtagTextStyle}
        placeholder="Hashtag..."
        placeholderTextColor="gray"
        onChangeValue={value => {
          setValue(value);
        }}
      />
    </View>
  );
};

export default TextInputComponent;

const styles = StyleSheet.create({
  container: {
    padding: scale(16),
  },
  input: {
    height: scale(55),
    paddingHorizontal: scale(12),
    borderRadius: scale(8),
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  inputStyle: { fontSize: fontScale(16) },
  labelStyle: { fontSize: fontScale(14) },
  placeholderStyle: { fontSize: fontScale(16) },
  textErrorStyle: { fontSize: fontScale(16) },
  hashtagStyle: {
    borderWidth: 0,
    borderRadius: scale(16),
    padding: scale(8),
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  hashtagTextStyle: {
    fontSize: fontScale(16),
  },
});
