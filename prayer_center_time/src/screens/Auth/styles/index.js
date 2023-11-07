import {StyleSheet} from 'react-native';
import {COLORS} from '../../../utils/Colors';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formWrapper: {
    width: '80%',
    alignItems: 'center',
    padding: 10,
    borderRadius: 30,
    borderWidth: 2,
    marginVertical: 10,
  },
  formTitle: {fontSize: 24, color: COLORS.mainColor},
  formInput: {
    borderColor: COLORS.darkColor200,
    width: '90%',
    borderWidth: 2,
    borderRadius: 10,
    margin: 10,
    padding: 10,
    fontSize: 16,
    height: 50,
  },
  inputError: {color: COLORS.errorColor, fontSize: 14},
  inputBox: {
    borderColor: COLORS.darkColor200,
    width: '90%',
    borderWidth: 2,
    borderRadius: 10,
    margin: 10,
    flexDirection: 'row',
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputInBox: {
    height: 50,
    width: '70%',
    borderWidth: 0,
    fontSize: 16,
    color: '#032107',
  },
});
