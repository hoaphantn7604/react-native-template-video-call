import { StyleSheet } from 'react-native';
import { scale, width } from 'react-native-utils-scale';

export const styles = StyleSheet.create({
  container: { flex: 1 },
  boxMyStream: {
    borderRadius: 10,
    padding: 3,
    flexDirection: 'row',
  },
  myStream: {
    width: 150,
    height: 180,
    borderRadius: 10,
  },
  remoteStream: {
    width: width / 2,
    height: width / 2 + 50,
    borderRadius: 10,
  },
  wrapButton: {
    flexDirection: 'row',
    marginTop: scale(16),
  },
  button: {
    width: scale(70),
    height: scale(40),
    marginLeft: scale(8),
    marginVertical: scale(2),
  },
  input: {
    width: scale(200),
    borderWidth: scale(0.5),
    borderColor: 'black',
    paddingHorizontal: scale(8),
    marginTop: scale(16),
  },
  wrap: {
    flex: 1,
    alignItems: 'center',
  },
});
