import { StyleSheet } from 'react-native';
import { scale } from 'react-native-utils-scale';

export const styles = StyleSheet.create({
  container: { flex: 1 },
  itemSlider: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgSlider: {
    borderRadius: scale(8),
  },
  item: {
    padding: scale(12),
    alignItems: 'center',
    flexDirection: 'row',
  },
  img: {
    borderRadius: scale(40),
  },
  wrap: {
    flex: 1,
  },
  text: {
    marginHorizontal: scale(8),
    lineHeight: scale(24),
  },
  modal: { padding: scale(16) },
  textinput: {
    borderBottomWidth: scale(0.5),
    height: scale(60),
    borderBottomColor: 'gray',
    marginVertical: scale(22),
  },
});
